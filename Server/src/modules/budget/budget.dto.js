import { z } from 'zod';

export const createExpenseSchema = z.object({
    category: z.enum(['TRANSPORT', 'STAY', 'ACTIVITIES', 'MEALS', 'MISC']),
    title: z.string().min(1, 'Expense title is required').max(200),
    amount: z.number().positive('Expense amount must be greater than 0'),
    currency: z.string().length(3).optional().default('USD'),
    expenseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD'),
    tripStopId: z.string().uuid().optional().nullable(),
    itineraryDayId: z.string().uuid().optional().nullable(),
    activityItemId: z.string().uuid().optional().nullable(),
    receiptUrl: z.string().url().optional().nullable().or(z.literal('')),
});

export const expenseListQuerySchema = z.object({
    category: z.enum(['TRANSPORT', 'STAY', 'ACTIVITIES', 'MEALS', 'MISC']).optional(),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export const expenseIdParamSchema = z.object({
    tripId: z.string().uuid('Valid Trip ID is required'),
    expenseId: z.string().uuid('Valid Expense ID is required'),
});
