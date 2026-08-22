import { Router } from 'express';
import { BudgetController } from './budget.controller.js';
import { authenticate, optionalAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
    createExpenseSchema,
    expenseListQuerySchema,
    expenseIdParamSchema,
} from './budget.dto.js';
import { tripIdParamSchema } from '../trips/trip.dto.js';

const router = Router();

// Budget summary (Optional auth for public/shared trips)
router.get(
    '/:tripId/budget/summary',
    optionalAuth,
    validate({ params: tripIdParamSchema }),
    BudgetController.getBudgetSummary
);

// List expenses (Optional auth for public/shared trips)
router.get(
    '/:tripId/expenses',
    optionalAuth,
    validate({ params: tripIdParamSchema, query: expenseListQuerySchema }),
    BudgetController.listExpenses
);

// Add expense (Protected - Owner only)
router.post(
    '/:tripId/expenses',
    authenticate,
    validate({ params: tripIdParamSchema, body: createExpenseSchema }),
    BudgetController.addExpense
);

// Delete expense (Protected - Owner only)
router.delete(
    '/:tripId/expenses/:expenseId',
    authenticate,
    validate({ params: expenseIdParamSchema }),
    BudgetController.deleteExpense
);

export default router;
