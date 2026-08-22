import { Router } from 'express';
import { ItineraryController } from './itinerary.controller.js';
import { authenticate, optionalAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
    addActivityItemSchema,
    updateActivityItemSchema,
    rescheduleItemSchema,
    dayIdParamSchema,
    itemIdParamSchema,
} from './itinerary.dto.js';
import { tripIdParamSchema } from '../trips/trip.dto.js';

const router = Router();

// Add activity item to day (Protected)
router.post(
    '/days/:dayId/items',
    authenticate,
    validate({ params: dayIdParamSchema, body: addActivityItemSchema }),
    ItineraryController.addItemToDay
);

// Update activity item (Protected)
router.patch(
    '/items/:itemId',
    authenticate,
    validate({ params: itemIdParamSchema, body: updateActivityItemSchema }),
    ItineraryController.updateActivityItem
);

// Delete activity item (Protected)
router.delete(
    '/items/:itemId',
    authenticate,
    validate({ params: itemIdParamSchema }),
    ItineraryController.deleteActivityItem
);

// Drag-and-drop reschedule item (Protected)
router.patch(
    '/items/reschedule',
    authenticate,
    validate({ body: rescheduleItemSchema }),
    ItineraryController.rescheduleItem
);

// Get trip timeline (Optional Auth / Public / Viewer)
router.get(
    '/:tripId/timeline',
    optionalAuth,
    validate({ params: tripIdParamSchema }),
    ItineraryController.getTripTimeline
);

// Get my calendar events (Protected)
router.get('/calendar/my-trips', authenticate, ItineraryController.getCalendarEvents);

export default router;
