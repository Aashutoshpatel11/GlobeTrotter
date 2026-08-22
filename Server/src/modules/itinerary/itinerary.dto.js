import { z } from 'zod';

export const addActivityItemSchema = z.object({
    activityCatalogId: z.string().uuid().optional(),
    customTitle: z.string().min(1, 'Title is required').max(200),
    customDescription: z.string().optional(),
    category: z.string().optional().default('SIGHTSEEING'),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format must be HH:MM (e.g. 09:30)').optional(),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format must be HH:MM (e.g. 11:30)').optional(),
    cost: z.number().min(0).optional().default(0),
    currency: z.string().length(3).optional().default('USD'),
    expenseCategory: z.enum(['TRANSPORT', 'STAY', 'ACTIVITIES', 'MEALS', 'MISC']).optional().default('ACTIVITIES'),
});

export const updateActivityItemSchema = z.object({
    customTitle: z.string().max(200).optional(),
    customDescription: z.string().optional(),
    category: z.string().optional(),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional().or(z.literal('')),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional().or(z.literal('')),
    cost: z.number().min(0).optional(),
    currency: z.string().length(3).optional(),
    expenseCategory: z.enum(['TRANSPORT', 'STAY', 'ACTIVITIES', 'MEALS', 'MISC']).optional(),
    isCompleted: z.boolean().optional(),
    itemOrder: z.number().int().min(1).optional(),
});

export const rescheduleItemSchema = z.object({
    itemId: z.string().uuid('Valid item ID is required'),
    targetDayId: z.string().uuid('Valid target day ID is required'),
    targetStartTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
    targetEndTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
    newOrder: z.number().int().min(1).optional(),
});

export const dayIdParamSchema = z.object({
    dayId: z.string().uuid('Valid Day ID is required'),
});

export const itemIdParamSchema = z.object({
    itemId: z.string().uuid('Valid Item ID is required'),
});

export const updateDaySchema = z.object({
    notes: z.string().optional(),
    dailyBudgetMin: z.number().min(0).optional(),
    dailyBudgetMax: z.number().min(0).optional(),
});
