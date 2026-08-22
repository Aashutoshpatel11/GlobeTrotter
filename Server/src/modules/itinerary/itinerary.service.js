import {
    ItineraryDay,
    ItineraryActivityItem,
    ActivityCatalog,
    TripStop,
    Trip,
    DestinationCity,
    sequelize,
} from '../../models/index.js';
import { ApiError } from '../../utils/apiError.js';

export class ItineraryService {
    static async addItemToDay(dayId, userId, itemData) {
        const day = await ItineraryDay.findByPk(dayId, {
            include: [
                {
                    model: TripStop,
                    as: 'tripStop',
                    include: [{ model: Trip, as: 'trip' }],
                },
            ],
        });

        if (!day) {
            throw new ApiError(404, 'Itinerary day not found', 'NOT_FOUND');
        }

        if (day.tripStop.trip.user_id !== userId) {
            throw new ApiError(403, 'You do not own this trip itinerary', 'FORBIDDEN');
        }

        let catalogItem = null;
        if (itemData.activityCatalogId) {
            catalogItem = await ActivityCatalog.findByPk(itemData.activityCatalogId);
        }

        const maxOrder = (await ItineraryActivityItem.max('item_order', { where: { itinerary_day_id: dayId } })) || 0;

        const newItem = await ItineraryActivityItem.create({
            itinerary_day_id: dayId,
            activity_catalog_id: itemData.activityCatalogId || null,
            custom_title: itemData.customTitle || (catalogItem ? catalogItem.title : 'Activity'),
            custom_description: itemData.customDescription || (catalogItem ? catalogItem.description : null),
            category: itemData.category || (catalogItem ? catalogItem.category : 'SIGHTSEEING'),
            start_time: itemData.startTime || null,
            end_time: itemData.endTime || null,
            cost: itemData.cost !== undefined ? itemData.cost : (catalogItem ? catalogItem.estimated_cost : 0),
            currency: itemData.currency || (catalogItem ? catalogItem.currency : 'USD'),
            expense_category: itemData.expenseCategory || 'ACTIVITIES',
            item_order: maxOrder + 1,
            is_completed: false,
        });

        return await ItineraryActivityItem.findByPk(newItem.id, {
            include: [{ model: ActivityCatalog, as: 'activityCatalog' }],
        });
    }

    static async updateActivityItem(itemId, userId, updateData) {
        const item = await ItineraryActivityItem.findByPk(itemId, {
            include: [
                {
                    model: ItineraryDay,
                    as: 'day',
                    include: [
                        {
                            model: TripStop,
                            as: 'tripStop',
                            include: [{ model: Trip, as: 'trip' }],
                        },
                    ],
                },
            ],
        });

        if (!item) {
            throw new ApiError(404, 'Activity item not found', 'NOT_FOUND');
        }

        if (item.day.tripStop.trip.user_id !== userId) {
            throw new ApiError(403, 'You do not own this trip item', 'FORBIDDEN');
        }

        const fields = {};
        if (updateData.customTitle !== undefined) fields.custom_title = updateData.customTitle;
        if (updateData.customDescription !== undefined) fields.custom_description = updateData.customDescription;
        if (updateData.category !== undefined) fields.category = updateData.category;
        if (updateData.startTime !== undefined) fields.start_time = updateData.startTime || null;
        if (updateData.endTime !== undefined) fields.end_time = updateData.endTime || null;
        if (updateData.cost !== undefined) fields.cost = updateData.cost;
        if (updateData.currency !== undefined) fields.currency = updateData.currency;
        if (updateData.expenseCategory !== undefined) fields.expense_category = updateData.expenseCategory;
        if (updateData.isCompleted !== undefined) fields.is_completed = updateData.isCompleted;
        if (updateData.itemOrder !== undefined) fields.item_order = updateData.itemOrder;

        await item.update(fields);

        return await ItineraryActivityItem.findByPk(itemId, {
            include: [{ model: ActivityCatalog, as: 'activityCatalog' }],
        });
    }

    static async deleteActivityItem(itemId, userId) {
        const item = await ItineraryActivityItem.findByPk(itemId, {
            include: [
                {
                    model: ItineraryDay,
                    as: 'day',
                    include: [
                        {
                            model: TripStop,
                            as: 'tripStop',
                            include: [{ model: Trip, as: 'trip' }],
                        },
                    ],
                },
            ],
        });

        if (!item) {
            throw new ApiError(404, 'Activity item not found', 'NOT_FOUND');
        }

        if (item.day.tripStop.trip.user_id !== userId) {
            throw new ApiError(403, 'You do not own this trip item', 'FORBIDDEN');
        }

        const dayId = item.itinerary_day_id;
        await item.destroy();

        // Reorder remaining items in day
        const remaining = await ItineraryActivityItem.findAll({
            where: { itinerary_day_id: dayId },
            order: [['item_order', 'ASC']],
        });

        for (let i = 0; i < remaining.length; i++) {
            await remaining[i].update({ item_order: i + 1 });
        }

        return { message: 'Activity item removed from schedule.' };
    }

    static async rescheduleItem(userId, { itemId, targetDayId, targetStartTime, targetEndTime, newOrder }) {
        const item = await ItineraryActivityItem.findByPk(itemId, {
            include: [
                {
                    model: ItineraryDay,
                    as: 'day',
                    include: [
                        {
                            model: TripStop,
                            as: 'tripStop',
                            include: [{ model: Trip, as: 'trip' }],
                        },
                    ],
                },
            ],
        });

        if (!item) {
            throw new ApiError(404, 'Activity item not found', 'NOT_FOUND');
        }

        if (item.day.tripStop.trip.user_id !== userId) {
            throw new ApiError(403, 'You do not own this trip item', 'FORBIDDEN');
        }

        const targetDay = await ItineraryDay.findByPk(targetDayId);
        if (!targetDay) {
            throw new ApiError(404, 'Target itinerary day not found', 'NOT_FOUND');
        }

        const maxOrder = (await ItineraryActivityItem.max('item_order', { where: { itinerary_day_id: targetDayId } })) || 0;

        await item.update({
            itinerary_day_id: targetDayId,
            start_time: targetStartTime !== undefined ? targetStartTime : item.start_time,
            end_time: targetEndTime !== undefined ? targetEndTime : item.end_time,
            item_order: newOrder || maxOrder + 1,
        });

        return await ItineraryActivityItem.findByPk(itemId, {
            include: [{ model: ActivityCatalog, as: 'activityCatalog' }],
        });
    }

    static async getTripTimeline(tripId, userId = null) {
        const trip = await Trip.findByPk(tripId, {
            include: [
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
            throw new ApiError(404, 'Trip not found', 'NOT_FOUND');
        }

        if (userId && trip.user_id !== userId && trip.visibility === 'PRIVATE') {
            throw new ApiError(403, 'Permission denied', 'FORBIDDEN');
        }

        // Format timeline view
        const timelineDays = [];
        for (const stop of trip.stops || []) {
            for (const day of stop.itineraryDays || []) {
                timelineDays.push({
                    dayId: day.id,
                    stopId: stop.id,
                    cityName: stop.city ? stop.city.name : 'Unknown City',
                    country: stop.city ? stop.city.country : '',
                    dayNumber: day.day_number,
                    date: day.date,
                    notes: day.notes,
                    dailyBudgetMin: day.daily_budget_min,
                    dailyBudgetMax: day.daily_budget_max,
                    activities: day.activityItems || [],
                });
            }
        }

        return {
            tripId: trip.id,
            tripTitle: trip.title,
            startDate: trip.start_date,
            endDate: trip.end_date,
            days: timelineDays,
        };
    }

    static async getCalendarEvents(userId) {
        const trips = await Trip.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: TripStop,
                    as: 'stops',
                    include: [
                        { model: DestinationCity, as: 'city' },
                        {
                            model: ItineraryDay,
                            as: 'itineraryDays',
                            include: [{ model: ItineraryActivityItem, as: 'activityItems' }],
                        },
                    ],
                },
            ],
            order: [['start_date', 'ASC']],
        });

        const events = trips.map((trip) => ({
            tripId: trip.id,
            title: trip.title,
            startDate: trip.start_date,
            endDate: trip.end_date,
            status: trip.status,
            coverImageUrl: trip.cover_image_url,
            stops: (trip.stops || []).map((stop) => ({
                stopId: stop.id,
                cityName: stop.city ? stop.city.name : 'City',
                arrivalDate: stop.arrival_date,
                departureDate: stop.departure_date,
                daysCount: (stop.itineraryDays || []).length,
            })),
        }));

        return { events };
    }
}

export default ItineraryService;
