import { z } from 'zod';

export const createTripSchema = z.object({
    title: z.string().min(1, 'Trip title is required').max(200),
    description: z.string().optional(),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD'),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD'),
    totalBudget: z.number().min(0).optional().default(0),
    currency: z.string().length(3).optional().default('USD'),
    coverImageUrl: z.string().url().optional().or(z.literal('')),
    initialCityIds: z.array(z.string().uuid()).optional(),
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: 'End date must be on or after start date',
    path: ['endDate'],
});

export const updateTripSchema = z.object({
    title: z.string().max(200).optional(),
    description: z.string().optional(),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    totalBudget: z.number().min(0).optional(),
    currency: z.string().length(3).optional(),
    status: z.enum(['PLANNING', 'ONGOING', 'COMPLETED', 'CANCELLED']).optional(),
    visibility: z.enum(['PRIVATE', 'PUBLIC', 'SHARED_LINK']).optional(),
    coverImageUrl: z.string().url().optional().or(z.literal('')),
});

export const tripIdParamSchema = z.object({
    tripId: z.string().uuid('Valid Trip ID is required'),
});

export const stopParamSchema = z.object({
    tripId: z.string().uuid('Valid Trip ID is required'),
    stopId: z.string().uuid('Valid Stop ID is required'),
});

export const addStopSchema = z.object({
    cityId: z.string().uuid('Valid City ID is required'),
    arrivalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD'),
    departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format must be YYYY-MM-DD'),
    allocatedBudget: z.number().min(0).optional().default(0),
    notes: z.string().optional(),
}).refine((data) => new Date(data.departureDate) >= new Date(data.arrivalDate), {
    message: 'Departure date must be on or after arrival date',
    path: ['departureDate'],
});

export const updateStopSchema = z.object({
    arrivalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    allocatedBudget: z.number().min(0).optional(),
    notes: z.string().optional(),
});

export const reorderStopsSchema = z.object({
    stopOrder: z.array(
        z.object({
            stopId: z.string().uuid(),
            newOrder: z.number().int().min(1),
        })
    ).min(1, 'At least one stop order item required'),
});

export const tripListQuerySchema = z.object({
    status: z.enum(['PLANNING', 'ONGOING', 'COMPLETED', 'CANCELLED']).optional(),
    page: z.string().regex(/^\d+$/).transform(Number).optional().default('1'),
    limit: z.string().regex(/^\d+$/).transform(Number).optional().default('10'),
});
