import { Router } from 'express';
import { AdminController } from './admin.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
    analyticsQuerySchema,
    adminUserListQuerySchema,
    userIdParamSchema,
    userStatusSchema,
} from './admin.dto.js';

const router = Router();

// All admin routes require Authentication AND ADMIN role
router.use(authenticate, authorize('ADMIN'));

router.get('/analytics/overview', validate({ query: analyticsQuerySchema }), AdminController.getOverviewAnalytics);
router.get('/analytics/trends', AdminController.getTrends);
router.get('/users', validate({ query: adminUserListQuerySchema }), AdminController.listUsers);
router.patch(
    '/users/:userId/status',
    validate({ params: userIdParamSchema, body: userStatusSchema }),
    AdminController.updateUserStatus
);

export default router;
