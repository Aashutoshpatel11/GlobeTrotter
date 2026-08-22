import crypto from 'crypto';
import { Op } from 'sequelize';
import {
    Trip,
    TripStop,
    DestinationCity,
    ItineraryDay,
    ItineraryActivityItem,
    ActivityCatalog,
    User,
    TripShare,
    TripLikeBookmark,
} from '../../models/index.js';
import { CloneTripService } from './clone-trip.service.js';
import { ApiError } from '../../utils/apiError.js';

export class CommunityService {
    static async getFeed({ search, sort = 'popular', page = 1, limit = 15 }) {
        const offset = (page - 1) * limit;
        const whereClause = { visibility: 'PUBLIC' };

        if (search) {
            whereClause[Op.or] = [
                { title: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } },
            ];
        }

        const order = sort === 'recent' ? [['created_at', 'DESC']] : [['clone_count', 'DESC'], ['view_count', 'DESC']];

        const { rows, count } = await Trip.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'first_name', 'last_name', 'avatar_url'],
                },
                {
                    model: TripStop,
                    as: 'stops',
                    include: [{ model: DestinationCity, as: 'city' }],
                },
            ],
            order,
            limit,
            offset,
            distinct: true,
        });

        return {
            items: rows,
            meta: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit),
            },
        };
    }

    static async getPublicTrip(tripId, currentUserId = null) {
        const trip = await Trip.findByPk(tripId, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'first_name', 'last_name', 'avatar_url', 'bio', 'city', 'country'],
                },
                {
                    model: TripStop,
                    as: 'stops',
                    include: [
                        { model: DestinationCity, as: 'city' },
                        {
                            model: ItineraryDay,
                            as: 'itineraryDays',
                            include: [
                                {
                                    model: ItineraryActivityItem,
                                    as: 'activityItems',
                                    include: [{ model: ActivityCatalog, as: 'activityCatalog' }],
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [
                [{ model: TripStop, as: 'stops' }, 'stop_order', 'ASC'],
                [{ model: TripStop, as: 'stops' }, { model: ItineraryDay, as: 'itineraryDays' }, 'day_number', 'ASC'],
                [
                    { model: TripStop, as: 'stops' },
                    { model: ItineraryDay, as: 'itineraryDays' },
                    { model: ItineraryActivityItem, as: 'activityItems' },
                    'item_order',
                    'ASC',
                ],
            ],
        });

        if (!trip || trip.visibility !== 'PUBLIC') {
            throw new ApiError(404, 'Public trip not found', 'NOT_FOUND');
        }

        // Increment view count
        await trip.increment('view_count', { by: 1 });

        let isLiked = false;
        let isBookmarked = false;

        if (currentUserId) {
            const interaction = await TripLikeBookmark.findOne({
                where: { user_id: currentUserId, trip_id: tripId },
            });
            if (interaction) {
                isLiked = interaction.is_liked;
                isBookmarked = interaction.is_bookmarked;
            }
        }

        const totalLikes = await TripLikeBookmark.count({
            where: { trip_id: tripId, is_liked: true },
        });

        return {
            trip,
            author: trip.user,
            isLiked,
            isBookmarked,
            likeCount: totalLikes,
        };
    }

    static async generateShareLink(tripId, userId, { permission = 'VIEW', expiresInDays = null }) {
        const trip = await Trip.findByPk(tripId);
        if (!trip) {
            throw new ApiError(404, 'Trip not found', 'NOT_FOUND');
        }

        if (trip.user_id !== userId) {
            throw new ApiError(403, 'Only the trip owner can generate share links', 'FORBIDDEN');
        }

        // Update trip visibility if private
        if (trip.visibility === 'PRIVATE') {
            await trip.update({ visibility: 'SHARED_LINK' });
        }

        let existingShare = await TripShare.findOne({ where: { trip_id: tripId } });

        if (!existingShare) {
            const shareToken = crypto.randomBytes(16).toString('hex');
            let expiresAt = null;
            if (expiresInDays) {
                const exp = new Date();
                exp.setDate(exp.getDate() + expiresInDays);
                expiresAt = exp;
            }

            existingShare = await TripShare.create({
                trip_id: tripId,
                share_token: shareToken,
                permission,
                expires_at: expiresAt,
            });
        }

        return {
            shareToken: existingShare.share_token,
            shareUrl: `${process.env.CLIENT_URL || 'http://localhost:5173'}/shared/trips/${existingShare.share_token}`,
            permission: existingShare.permission,
        };
    }

    static async getSharedTrip(shareToken) {
        const share = await TripShare.findOne({
            where: { share_token: shareToken },
        });

        if (!share) {
            throw new ApiError(404, 'Shared trip link is invalid or expired', 'NOT_FOUND');
        }

        if (share.expires_at && new Date(share.expires_at) < new Date()) {
            throw new ApiError(410, 'This shared trip link has expired', 'LINK_EXPIRED');
        }

        const trip = await Trip.findByPk(share.trip_id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'first_name', 'last_name', 'avatar_url'],
                },
                {
                    model: TripStop,
                    as: 'stops',
                    include: [
                        { model: DestinationCity, as: 'city' },
                        {
                            model: ItineraryDay,
                            as: 'itineraryDays',
                            include: [
                                {
                                    model: ItineraryActivityItem,
                                    as: 'activityItems',
                                    include: [{ model: ActivityCatalog, as: 'activityCatalog' }],
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [
                [{ model: TripStop, as: 'stops' }, 'stop_order', 'ASC'],
                [{ model: TripStop, as: 'stops' }, { model: ItineraryDay, as: 'itineraryDays' }, 'day_number', 'ASC'],
                [
                    { model: TripStop, as: 'stops' },
                    { model: ItineraryDay, as: 'itineraryDays' },
                    { model: ItineraryActivityItem, as: 'activityItems' },
                    'item_order',
                    'ASC',
                ],
            ],
        });

        if (!trip) {
            throw new ApiError(404, 'Trip referenced by share link not found', 'NOT_FOUND');
        }

        return {
            trip,
            permission: share.permission,
        };
    }

    static async toggleLikeTrip(tripId, userId) {
        const trip = await Trip.findByPk(tripId);
        if (!trip) {
            throw new ApiError(404, 'Trip not found', 'NOT_FOUND');
        }

        const [interaction, created] = await TripLikeBookmark.findOrCreate({
            where: { user_id: userId, trip_id: tripId },
            defaults: { is_liked: true, is_bookmarked: false },
        });

        if (!created) {
            await interaction.update({ is_liked: !interaction.is_liked });
        }

        const likeCount = await TripLikeBookmark.count({
            where: { trip_id: tripId, is_liked: true },
        });

        return {
            isLiked: created ? true : interaction.is_liked,
            likeCount,
        };
    }

    static async copyTrip(tripId, userId, newStartDate = null) {
        const cloned = await CloneTripService.cloneTrip(tripId, userId, newStartDate);
        return {
            clonedTripId: cloned.id,
            clonedTrip: cloned,
            message: 'Trip copied to your account successfully!',
        };
    }
}

export default CommunityService;
