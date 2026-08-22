import { z } from 'zod';

export const communityFeedQuerySchema = z.object({
    search: z.string().optional(),
    sort: z.enum(['popular', 'recent']).optional().default('popular'),
    page: z.string().regex(/^\d+$/).transform(Number).optional().default('1'),
    limit: z.string().regex(/^\d+$/).transform(Number).optional().default('15'),
});

export const shareLinkSchema = z.object({
    permission: z.enum(['VIEW', 'EDIT']).optional().default('VIEW'),
    expiresInDays: z.number().int().positive().optional(),
});

export const copyTripSchema = z.object({
    newStartDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD').optional(),
});

export const shareTokenParamSchema = z.object({
    shareToken: z.string().min(1, 'Share token is required'),
});
