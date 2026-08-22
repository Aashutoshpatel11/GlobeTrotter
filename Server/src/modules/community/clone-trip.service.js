import {
    Trip,
    TripStop,
    DestinationCity,
    ItineraryDay,
    ItineraryActivityItem,
    ActivityCatalog,
    sequelize,
} from '../../models/index.js';
import { ApiError } from '../../utils/apiError.js';

export class CloneTripService {
    /**
     * Performs transactional deep clone of an itinerary into the target user's account.
     * @param {string} sourceTripId
     * @param {string} targetUserId
     * @param {string} [newStartDate]
     */
    static async cloneTrip(sourceTripId, targetUserId, newStartDate = null) {
        const sourceTrip = await Trip.findByPk(sourceTripId, {
            include: [
                {
                    model: TripStop,
                    as: 'stops',
                    include: [
                        {
                            model: ItineraryDay,
                            as: 'itineraryDays',
                            include: [{ model: ItineraryActivityItem, as: 'activityItems' }],
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

        if (!sourceTrip) {
            throw new ApiError(404, 'Source trip not found', 'NOT_FOUND');
        }

        // Calculate date offset if user requested a new start date
        let dayOffsetMs = 0;
        let clonedStartDate = sourceTrip.start_date;
        let clonedEndDate = sourceTrip.end_date;

        if (newStartDate) {
            const oldStart = new Date(sourceTrip.start_date);
            const targetStart = new Date(newStartDate);
            dayOffsetMs = targetStart.getTime() - oldStart.getTime();

            const oldEnd = new Date(sourceTrip.end_date);
            const targetEnd = new Date(oldEnd.getTime() + dayOffsetMs);

            clonedStartDate = targetStart.toISOString().split('T')[0];
            clonedEndDate = targetEnd.toISOString().split('T')[0];
        }

        const shiftDate = (dateStr) => {
            if (!dayOffsetMs) return dateStr;
            const d = new Date(dateStr);
            const shifted = new Date(d.getTime() + dayOffsetMs);
            return shifted.toISOString().split('T')[0];
        };

        const transaction = await sequelize.transaction();
        try {
            // 1. Create Cloned Trip
            const clonedTrip = await Trip.create(
                {
                    user_id: targetUserId,
                    title: `Copy of ${sourceTrip.title}`,
                    description: sourceTrip.description,
                    cover_image_url: sourceTrip.cover_image_url,
                    start_date: clonedStartDate,
                    end_date: clonedEndDate,
                    total_budget: sourceTrip.total_budget,
                    currency: sourceTrip.currency,
                    status: 'PLANNING',
                    visibility: 'PRIVATE',
                    copied_from_trip_id: sourceTrip.id,
                },
                { transaction }
            );

            // 2. Clone Stops, Days, and Activity Items
            for (const stop of sourceTrip.stops || []) {
                const clonedStop = await TripStop.create(
                    {
                        trip_id: clonedTrip.id,
                        city_id: stop.city_id,
                        stop_order: stop.stop_order,
                        arrival_date: shiftDate(stop.arrival_date),
                        departure_date: shiftDate(stop.departure_date),
                        allocated_budget: stop.allocated_budget,
                        notes: stop.notes,
                    },
                    { transaction }
                );

                for (const day of stop.itineraryDays || []) {
                    const clonedDay = await ItineraryDay.create(
                        {
                            trip_stop_id: clonedStop.id,
                            day_number: day.day_number,
                            date: shiftDate(day.date),
                            notes: day.notes,
                            daily_budget_min: day.daily_budget_min,
                            daily_budget_max: day.daily_budget_max,
                        },
                        { transaction }
                    );

                    for (const item of day.activityItems || []) {
                        await ItineraryActivityItem.create(
                            {
                                itinerary_day_id: clonedDay.id,
                                activity_catalog_id: item.activity_catalog_id,
                                custom_title: item.custom_title,
                                custom_description: item.custom_description,
                                category: item.category,
                                start_time: item.start_time,
                                end_time: item.end_time,
                                cost: item.cost,
                                currency: item.currency,
                                expense_category: item.expense_category,
                                is_completed: false,
                                item_order: item.item_order,
                            },
                            { transaction }
                        );
                    }
                }
            }

            // 3. Increment clone counter on source trip
            await sourceTrip.increment('clone_count', { by: 1, transaction });

            await transaction.commit();

            return clonedTrip;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

export default CloneTripService;
