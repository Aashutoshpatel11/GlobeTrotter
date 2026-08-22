import { Op } from 'sequelize';
import {
    Trip,
    TripStop,
    DestinationCity,
    ItineraryDay,
    ItineraryActivityItem,
    ActivityCatalog,
    TripExpense,
    User,
    sequelize,
} from '../../models/index.js';
import { ApiError } from '../../utils/apiError.js';

export class TripService {
    static async listUserTrips(userId, status = null, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const whereClause = { user_id: userId };
        if (status) {
            whereClause.status = status;
        }

        const { rows, count } = await Trip.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: TripStop,
                    as: 'stops',
                    include: [{ model: DestinationCity, as: 'city' }],
                },
            ],
            order: [['start_date', 'ASC']],
            limit,
            offset,
            distinct: true,
        });

        // Compute aggregate counts for UI tabs
        const [ongoingCount, upcomingCount, completedCount, planningCount] = await Promise.all([
            Trip.count({ where: { user_id: userId, status: 'ONGOING' } }),
            Trip.count({ where: { user_id: userId, status: 'PLANNING' } }),
            Trip.count({ where: { user_id: userId, status: 'COMPLETED' } }),
            Trip.count({ where: { user_id: userId, status: 'PLANNING' } }),
        ]);

        return {
            items: rows,
            counts: {
                ongoing: ongoingCount,
                upcoming: upcomingCount,
                completed: completedCount,
                planning: planningCount,
            },
            meta: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit),
            },
        };
    }

    static async createTrip(userId, data) {
        const transaction = await sequelize.transaction();
        try {
            const trip = await Trip.create(
                {
                    user_id: userId,
                    title: data.title,
                    description: data.description || null,
                    start_date: data.startDate,
                    end_date: data.endDate,
                    total_budget: data.totalBudget || 0,
                    currency: data.currency || 'USD',
                    cover_image_url: data.coverImageUrl || null,
                    status: 'PLANNING',
                    visibility: 'PRIVATE',
                },
                { transaction }
            );

            // If initial cities were passed, add them as consecutive stops
            if (data.initialCityIds && Array.isArray(data.initialCityIds) && data.initialCityIds.length > 0) {
                for (let i = 0; i < data.initialCityIds.length; i++) {
                    const cityId = data.initialCityIds[i];
                    const stop = await TripStop.create(
                        {
                            trip_id: trip.id,
                            city_id: cityId,
                            stop_order: i + 1,
                            arrival_date: data.startDate,
                            departure_date: data.endDate,
                            allocated_budget: 0,
                        },
                        { transaction }
                    );

                    // Generate at least Day 1 for this stop
                    await ItineraryDay.create(
                        {
                            trip_stop_id: stop.id,
                            day_number: 1,
                            date: data.startDate,
                            daily_budget_min: 0,
                            daily_budget_max: 0,
                        },
                        { transaction }
                    );
                }
            }

            await transaction.commit();

            return await this.getTripById(trip.id, userId);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    static async getTripById(tripId, userId = null) {
        const trip = await Trip.findByPk(tripId, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'first_name', 'last_name', 'avatar_url', 'email'],
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
                {
                    model: TripExpense,
                    as: 'expenses',
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
            throw new ApiError(404, 'Trip not found', 'NOT_FOUND');
        }

        // Access check: Owner or Public / Shared
        if (userId && trip.user_id !== userId && trip.visibility === 'PRIVATE') {
            throw new ApiError(403, 'You do not have permission to view this trip', 'FORBIDDEN');
        }

        return trip;
    }

    static async updateTrip(tripId, userId, updateData) {
        const trip = await Trip.findByPk(tripId);
        if (!trip) {
            throw new ApiError(404, 'Trip not found', 'NOT_FOUND');
        }

        if (trip.user_id !== userId) {
            throw new ApiError(403, 'Only the trip owner can modify this trip', 'FORBIDDEN');
        }

        const fields = {};
        if (updateData.title !== undefined) fields.title = updateData.title;
        if (updateData.description !== undefined) fields.description = updateData.description;
        if (updateData.startDate !== undefined) fields.start_date = updateData.startDate;
        if (updateData.endDate !== undefined) fields.end_date = updateData.endDate;
        if (updateData.totalBudget !== undefined) fields.total_budget = updateData.totalBudget;
        if (updateData.currency !== undefined) fields.currency = updateData.currency;
        if (updateData.status !== undefined) fields.status = updateData.status;
        if (updateData.visibility !== undefined) fields.visibility = updateData.visibility;
        if (updateData.coverImageUrl !== undefined) fields.cover_image_url = updateData.coverImageUrl;

        await trip.update(fields);
        return await this.getTripById(tripId, userId);
    }

    static async deleteTrip(tripId, userId) {
        const trip = await Trip.findByPk(tripId);
        if (!trip) {
            throw new ApiError(404, 'Trip not found', 'NOT_FOUND');
        }

        if (trip.user_id !== userId) {
            throw new ApiError(403, 'Only the trip owner can delete this trip', 'FORBIDDEN');
        }

        await trip.destroy();
        return { message: 'Trip and all its itinerary stops deleted successfully.' };
    }

    static async addStop(tripId, userId, stopData) {
        const trip = await Trip.findByPk(tripId);
        if (!trip) {
            throw new ApiError(404, 'Trip not found', 'NOT_FOUND');
        }

        if (trip.user_id !== userId) {
            throw new ApiError(403, 'Only the trip owner can add stops', 'FORBIDDEN');
        }

        const city = await DestinationCity.findByPk(stopData.cityId);
        if (!city) {
            throw new ApiError(404, 'Destination city not found', 'CITY_NOT_FOUND');
        }

        const maxOrder = (await TripStop.max('stop_order', { where: { trip_id: tripId } })) || 0;

        const transaction = await sequelize.transaction();
        try {
            const newStop = await TripStop.create(
                {
                    trip_id: tripId,
                    city_id: stopData.cityId,
                    stop_order: maxOrder + 1,
                    arrival_date: stopData.arrivalDate,
                    departure_date: stopData.departureDate,
                    allocated_budget: stopData.allocatedBudget || 0,
                    notes: stopData.notes || null,
                },
                { transaction }
            );

            // Generate daily itinerary records across date range
            const start = new Date(stopData.arrivalDate);
            const end = new Date(stopData.departureDate);
            let dayCount = 1;

            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                const dateStr = d.toISOString().split('T')[0];
                await ItineraryDay.create(
                    {
                        trip_stop_id: newStop.id,
                        day_number: dayCount,
                        date: dateStr,
                        daily_budget_min: 0,
                        daily_budget_max: 0,
                    },
                    { transaction }
                );
                dayCount++;
            }

            await transaction.commit();

            return await TripStop.findByPk(newStop.id, {
                include: [
                    { model: DestinationCity, as: 'city' },
                    { model: ItineraryDay, as: 'itineraryDays' },
                ],
            });
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    static async updateStop(tripId, stopId, userId, updateData) {
        const stop = await TripStop.findOne({
            where: { id: stopId, trip_id: tripId },
            include: [{ model: Trip, as: 'trip' }],
        });

        if (!stop) {
            throw new ApiError(404, 'Trip stop not found', 'NOT_FOUND');
        }

        if (stop.trip.user_id !== userId) {
            throw new ApiError(403, 'Only the trip owner can update this stop', 'FORBIDDEN');
        }

        const fields = {};
        if (updateData.allocatedBudget !== undefined) fields.allocated_budget = updateData.allocatedBudget;
        if (updateData.notes !== undefined) fields.notes = updateData.notes;
        if (updateData.arrivalDate !== undefined) fields.arrival_date = updateData.arrivalDate;
        if (updateData.departureDate !== undefined) fields.departure_date = updateData.departureDate;

        await stop.update(fields);

        return await TripStop.findByPk(stopId, {
            include: [
                { model: DestinationCity, as: 'city' },
                { model: ItineraryDay, as: 'itineraryDays' },
            ],
        });
    }

    static async reorderStops(tripId, userId, stopOrderArray) {
        const trip = await Trip.findByPk(tripId);
        if (!trip) {
            throw new ApiError(404, 'Trip not found', 'NOT_FOUND');
        }

        if (trip.user_id !== userId) {
            throw new ApiError(403, 'Only the trip owner can reorder stops', 'FORBIDDEN');
        }

        const transaction = await sequelize.transaction();
        try {
            // Give temporary negative order numbers to avoid unique constraint collision during swap
            for (const item of stopOrderArray) {
                await TripStop.update(
                    { stop_order: -item.newOrder },
                    { where: { id: item.stopId, trip_id: tripId }, transaction }
                );
            }

            // Restore positive target orders
            for (const item of stopOrderArray) {
                await TripStop.update(
                    { stop_order: item.newOrder },
                    { where: { id: item.stopId, trip_id: tripId }, transaction }
                );
            }

            await transaction.commit();

            return await TripStop.findAll({
                where: { trip_id: tripId },
                include: [{ model: DestinationCity, as: 'city' }],
                order: [['stop_order', 'ASC']],
            });
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    static async deleteStop(tripId, stopId, userId) {
        const stop = await TripStop.findOne({
            where: { id: stopId, trip_id: tripId },
            include: [{ model: Trip, as: 'trip' }],
        });

        if (!stop) {
            throw new ApiError(404, 'Trip stop not found', 'NOT_FOUND');
        }

        if (stop.trip.user_id !== userId) {
            throw new ApiError(403, 'Only the trip owner can delete stops', 'FORBIDDEN');
        }

        await stop.destroy();

        // Re-number remaining stops
        const remainingStops = await TripStop.findAll({
            where: { trip_id: tripId },
            order: [['stop_order', 'ASC']],
        });

        for (let i = 0; i < remainingStops.length; i++) {
            await remainingStops[i].update({ stop_order: i + 1 });
        }

        return { message: 'Trip stop removed and remaining stops reconciled.' };
    }
}

export default TripService;
