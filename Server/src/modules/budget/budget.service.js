import { Op } from 'sequelize';
import {
    Trip,
    TripExpense,
    TripStop,
    ItineraryDay,
    ItineraryActivityItem,
} from '../../models/index.js';
import { BudgetCalculator } from './budget.calculator.js';
import { ApiError } from '../../utils/apiError.js';

export class BudgetService {
    static async getBudgetSummary(tripId, userId = null) {
        const trip = await Trip.findByPk(tripId, {
            include: [
                {
                    model: TripStop,
                    as: 'stops',
                    include: [{ model: ItineraryDay, as: 'itineraryDays' }],
                },
                {
                    model: TripExpense,
                    as: 'expenses',
                },
            ],
        });

        if (!trip) {
            throw new ApiError(404, 'Trip not found', 'NOT_FOUND');
        }

        if (userId && trip.user_id !== userId && trip.visibility === 'PRIVATE') {
            throw new ApiError(403, 'Permission denied', 'FORBIDDEN');
        }

        const allDays = [];
        for (const stop of trip.stops || []) {
            for (const day of stop.itineraryDays || []) {
                allDays.push(day);
            }
        }

        return BudgetCalculator.computeSummary(trip, trip.expenses || [], allDays);
    }

    static async listExpenses(tripId, userId = null, { category, startDate, endDate }) {
        const trip = await Trip.findByPk(tripId);
        if (!trip) {
            throw new ApiError(404, 'Trip not found', 'NOT_FOUND');
        }

        if (userId && trip.user_id !== userId && trip.visibility === 'PRIVATE') {
            throw new ApiError(403, 'Permission denied', 'FORBIDDEN');
        }

        const whereClause = { trip_id: tripId };
        if (category) {
            whereClause.category = category;
        }

        if (startDate && endDate) {
            whereClause.expense_date = { [Op.between]: [startDate, endDate] };
        } else if (startDate) {
            whereClause.expense_date = { [Op.gte]: startDate };
        } else if (endDate) {
            whereClause.expense_date = { [Op.lte]: endDate };
        }

        const expenses = await TripExpense.findAll({
            where: whereClause,
            include: [
                { model: TripStop, as: 'tripStop' },
                { model: ItineraryDay, as: 'day' },
                { model: ItineraryActivityItem, as: 'activityItem' },
            ],
            order: [['expense_date', 'DESC'], ['created_at', 'DESC']],
        });

        return expenses;
    }

    static async addExpense(tripId, userId, expenseData) {
        const trip = await Trip.findByPk(tripId);
        if (!trip) {
            throw new ApiError(404, 'Trip not found', 'NOT_FOUND');
        }

        if (trip.user_id !== userId) {
            throw new ApiError(403, 'Only the trip owner can add expenses', 'FORBIDDEN');
        }

        const newExpense = await TripExpense.create({
            trip_id: tripId,
            user_id: userId,
            category: expenseData.category,
            title: expenseData.title,
            amount: expenseData.amount,
            currency: expenseData.currency || trip.currency || 'USD',
            expense_date: expenseData.expenseDate,
            trip_stop_id: expenseData.tripStopId || null,
            itinerary_day_id: expenseData.itineraryDayId || null,
            activity_item_id: expenseData.activityItemId || null,
            receipt_url: expenseData.receiptUrl || null,
        });

        return newExpense;
    }

    static async deleteExpense(tripId, expenseId, userId) {
        const expense = await TripExpense.findOne({
            where: { id: expenseId, trip_id: tripId },
            include: [{ model: Trip, as: 'trip' }],
        });

        if (!expense) {
            throw new ApiError(404, 'Expense entry not found', 'NOT_FOUND');
        }

        if (expense.trip.user_id !== userId) {
            throw new ApiError(403, 'Only the trip owner can delete expenses', 'FORBIDDEN');
        }

        await expense.destroy();
        return { message: 'Expense entry deleted successfully.' };
    }
}

export default BudgetService;
