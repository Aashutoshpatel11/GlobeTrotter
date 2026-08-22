import { Router } from 'express';
import { DiscoveryController } from './discovery.controller.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
    citySearchQuerySchema,
    activitySearchQuerySchema,
    cityIdParamSchema,
    popularCitiesQuerySchema,
    suggestionsQuerySchema,
} from './discovery.dto.js';

const router = Router();

// Cities
router.get('/cities/search', validate({ query: citySearchQuerySchema }), DiscoveryController.searchCities);
router.get('/cities/popular', validate({ query: popularCitiesQuerySchema }), DiscoveryController.getPopularCities);
router.get('/cities/:cityId', validate({ params: cityIdParamSchema }), DiscoveryController.getCityById);
router.get(
    '/cities/:cityId/suggestions',
    validate({ params: cityIdParamSchema, query: suggestionsQuerySchema }),
    DiscoveryController.getCitySuggestions
);

// Activities
router.get('/activities/search', validate({ query: activitySearchQuerySchema }), DiscoveryController.searchActivities);

export default router;
