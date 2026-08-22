import { AdminService } from './admin.service.js';
import { sendResponse } from '../../utils/apiResponse.js';

export class AdminController {
    static async getOverviewAnalytics(req, res, next) {
        try {
            const { timeframe } = req.query;
            const data = await AdminService.getOverviewAnalytics(timeframe);
            return sendResponse(res, 200, 'Admin analytics overview retrieved', data);
        } catch (error) {
            next(error);
        }
    }

    static async getTrends(req, res, next) {
        try {
            const data = await AdminService.getTrends();
            return sendResponse(res, 200, 'Trends data retrieved', data);
        } catch (error) {
            next(error);
        }
    }

    static async listUsers(req, res, next) {
        try {
            const { search, role, page, limit } = req.query;
            const result = await AdminService.listUsers({
                search,
                role,
                page: page ? parseInt(page, 10) : 1,
                limit: limit ? parseInt(limit, 10) : 25,
            });
            return sendResponse(res, 200, 'Users retrieved successfully', result.items, result.meta);
        } catch (error) {
            next(error);
        }
    }

    static async updateUserStatus(req, res, next) {
        try {
            const { userId } = req.params;
            const { isActive } = req.body;
            const user = await AdminService.updateUserStatus(userId, isActive);
            return sendResponse(res, 200, 'User status updated successfully', { user });
        } catch (error) {
            next(error);
        }
    }
}

export default AdminController;
