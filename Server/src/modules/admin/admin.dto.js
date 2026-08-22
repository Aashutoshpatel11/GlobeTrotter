import { z } from 'zod';

export const analyticsQuerySchema = z.object({
    timeframe: z.enum(['30d', '90d', '1y', 'all']).optional().default('30d'),
});

export const adminUserListQuerySchema = z.object({
    search: z.string().optional(),
    role: z.enum(['TRAVELER', 'ADMIN']).optional(),
    page: z.string().regex(/^\d+$/).transform(Number).optional().default('1'),
    limit: z.string().regex(/^\d+$/).transform(Number).optional().default('25'),
});

export const userIdParamSchema = z.object({
    userId: z.string().uuid('Valid user ID is required'),
});

export const userStatusSchema = z.object({
    isActive: z.boolean(),
});
