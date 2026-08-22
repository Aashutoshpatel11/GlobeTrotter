import { z } from 'zod';

export const citySearchQuerySchema = z.object({
    q: z.string().optional(),
    country: z.string().optional(),
    costIndex: z.enum(['BUDGET', 'MODERATE', 'LUXURY']).optional(),
    page: z.string().regex(/^\d+$/).transform(Number).optional().default('1'),
    limit: z.string().regex(/^\d+$/).transform(Number).optional().default('20'),
});

export const activitySearchQuerySchema = z.object({
    q: z.string().optional(),
    cityId: z.string().uuid().optional(),
    category: z.enum(['SIGHTSEEING', 'FOOD_AND_DRINK', 'ADVENTURE', 'CULTURE', 'RELAXATION', 'SHOPPING', 'NIGHTLIFE']).optional(),
    maxCost: z.string().regex(/^\d+(\.\d+)?$/).transform(Number).optional(),
    maxDuration: z.string().regex(/^\d+$/).transform(Number).optional(),
    page: z.string().regex(/^\d+$/).transform(Number).optional().default('1'),
    limit: z.string().regex(/^\d+$/).transform(Number).optional().default('20'),
});

export const cityIdParamSchema = z.object({
    cityId: z.string().uuid('Valid City ID is required'),
});

export const popularCitiesQuerySchema = z.object({
    limit: z.string().regex(/^\d+$/).transform(Number).optional().default('8'),
});

export const suggestionsQuerySchema = z.object({
    pattern: z.string().optional(),
});
