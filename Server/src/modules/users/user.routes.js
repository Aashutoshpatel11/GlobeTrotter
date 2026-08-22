import { Router } from 'express';
import { UserController } from './user.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
    updateProfileSchema,
    deleteAccountSchema,
    saveDestinationSchema,
    cityParamSchema,
    paginationQuerySchema,
} from './user.dto.js';

const router = Router();

// All user routes require authentication
router.use(authenticate);

router.get('/me', UserController.getMe);
router.patch('/me', validate({ body: updateProfileSchema }), UserController.updateMe);
router.delete('/me', validate({ body: deleteAccountSchema }), UserController.deleteMe);

router.get(
    '/me/saved-destinations',
    validate({ query: paginationQuerySchema }),
    UserController.getSavedDestinations
);
router.post(
    '/me/saved-destinations',
    validate({ body: saveDestinationSchema }),
    UserController.saveDestination
);
router.delete(
    '/me/saved-destinations/:cityId',
    validate({ params: cityParamSchema }),
    UserController.removeSavedDestination
);

export default router;
