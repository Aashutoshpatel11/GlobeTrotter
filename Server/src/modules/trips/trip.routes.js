import { Router } from 'express';
import { TripController } from './trip.controller.js';
import { authenticate, optionalAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
    createTripSchema,
    updateTripSchema,
    tripIdParamSchema,
    stopParamSchema,
    addStopSchema,
    updateStopSchema,
    reorderStopsSchema,
    tripListQuerySchema,
} from './trip.dto.js';

const router = Router();

// 1. List user trips (Protected)
router.get('/', authenticate, validate({ query: tripListQuerySchema }), TripController.listUserTrips);

// 2. Create trip (Protected)
router.post('/', authenticate, validate({ body: createTripSchema }), TripController.createTrip);

// 3. Get single trip (Optional Auth for public/shared trips)
router.get('/:tripId', optionalAuth, validate({ params: tripIdParamSchema }), TripController.getTripById);

// 4. Update trip (Protected)
router.patch(
    '/:tripId',
    authenticate,
    validate({ params: tripIdParamSchema, body: updateTripSchema }),
    TripController.updateTrip
);

// 5. Delete trip (Protected)
router.delete('/:tripId', authenticate, validate({ params: tripIdParamSchema }), TripController.deleteTrip);

// 6. Stop management (Protected)
router.post(
    '/:tripId/stops',
    authenticate,
    validate({ params: tripIdParamSchema, body: addStopSchema }),
    TripController.addStop
);

router.patch(
    '/:tripId/stops/reorder',
    authenticate,
    validate({ params: tripIdParamSchema, body: reorderStopsSchema }),
    TripController.reorderStops
);

router.patch(
    '/:tripId/stops/:stopId',
    authenticate,
    validate({ params: stopParamSchema, body: updateStopSchema }),
    TripController.updateStop
);

router.delete(
    '/:tripId/stops/:stopId',
    authenticate,
    validate({ params: stopParamSchema }),
    TripController.deleteStop
);

export default router;
