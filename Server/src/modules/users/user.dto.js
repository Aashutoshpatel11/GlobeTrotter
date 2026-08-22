import { z } from 'zod';

export const updateProfileSchema = z.object({
    firstName: z.string().max(100).optional(),
    lastName: z.string().max(100).optional(),
    phone: z.string().max(30).optional(),
    city: z.string().max(100).optional(),
    country: z.string().max(100).optional(),
    bio: z.string().max(500).optional(),
    avatarUrl: z.string().url('Invalid avatar URL').optional().or(z.literal('')),
    preferredCurrency: z.string().length(3, 'Currency code must be 3 letters (e.g., USD)').optional(),
    preferredLanguage: z.string().max(10).optional(),
});

export const deleteAccountSchema = z.object({
    confirmation: z.literal('DELETE', {
        errorMap: () => ({ message: 'Confirmation must be exact string "DELETE"' }),
    }),
});

export const saveDestinationSchema = z.object({
    cityId: z.string().uuid('Valid city ID is required'),
    notes: z.string().max(255).optional(),
});

export const cityParamSchema = z.object({
    cityId: z.string().uuid('Valid city ID is required'),
});

export const paginationQuerySchema = z.object({
    page: z.string().regex(/^\d+$/).transform(Number).optional().default('1'),
    limit: z.string().regex(/^\d+$/).transform(Number).optional().default('20'),
});
