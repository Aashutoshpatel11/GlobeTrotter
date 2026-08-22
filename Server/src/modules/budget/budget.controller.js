import { BudgetService } from './budget.service.js';
import { sendResponse } from '../../utils/apiResponse.js';

export class BudgetController {
    static async getBudgetSummary(req, res, next) {
        try {
            const { tripId } = req.params;
            const summary = await BudgetService.getBudgetSummary(tripId, req.user ? req.user.id : null);
            return sendResponse(res, 200, 'Budget summary retrieved successfully', summary);
        } catch (error) {
            next(error);
        }
    }

    static async listExpenses(req, res, next) {
        try {
            const { tripId } = req.params;
            const { category, startDate, endDate } = req.query;
            const items = await BudgetService.listExpenses(tripId, req.user ? req.user.id : null, {
                category,
                startDate,
                endDate,
            });
            return sendResponse(res, 200, 'Expenses retrieved successfully', items);
        } catch (error) {
            next(error);
        }
    }

    static async addExpense(req, res, next) {
        try {
            const { tripId } = req.params;
            const expense = await BudgetService.addExpense(tripId, req.user.id, req.body);
            return sendResponse(res, 201, 'Expense recorded successfully', { expense });
        } catch (error) {
            next(error);
        }
    }

    static async deleteExpense(req, res, next) {
        try {
            const { tripId, expenseId } = req.params;
            const result = await BudgetService.deleteExpense(tripId, expenseId, req.user.id);
            return sendResponse(res, 200, result.message, result);
        } catch (error) {
            next(error);
        }
    }
}

export default BudgetController;
