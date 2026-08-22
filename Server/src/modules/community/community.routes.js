import { Router } from 'express';
import { CommunityController } from './community.controller.js';
import { authenticate, optionalAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
    communityFeedQuerySchema,
    shareLinkSchema,
    copyTripSchema,
    shareTokenParamSchema,
} from './community.dto.js';
import { tripIdParamSchema } from '../trips/trip.dto.js';

const router = Router();

// 1. Community Feed (Public / Optional Auth for user's like flags)
router.get('/feed', optionalAuth, validate({ query: communityFeedQuerySchema }), CommunityController.getFeed);

// 2. View Public Trip Detail (Public / Optional Auth)
router.get('/trips/:tripId', optionalAuth, validate({ params: tripIdParamSchema }), CommunityController.getPublicTrip);

// 3. Generate Share Link (Protected - Owner only)
router.post(
    '/trips/:tripId/share-link',
    authenticate,
    validate({ params: tripIdParamSchema, body: shareLinkSchema }),
    CommunityController.generateShareLink
);

// 4. Resolve Shared Trip View (Public)
router.get('/shared/:shareToken', validate({ params: shareTokenParamSchema }), CommunityController.getSharedTrip);

// 5. Copy / Clone Trip (Protected)
router.post(
    '/trips/:tripId/copy',
    authenticate,
    validate({ params: tripIdParamSchema, body: copyTripSchema }),
    CommunityController.copyTrip
);

// 6. Like / Bookmark Trip (Protected)
router.post(
    '/trips/:tripId/like',
    authenticate,
    validate({ params: tripIdParamSchema }),
    CommunityController.toggleLike
);

export default router;
