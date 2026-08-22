import { UserService } from './user.service.js';
import { sendResponse } from '../../utils/apiResponse.js';

export class UserController {
    static async getMe(req, res, next) {
        try {
            const user = await UserService.getProfile(req.user.id);
            return sendResponse(res, 200, 'User profile retrieved', { user });
        } catch (error) {
            next(error);
        }
    }

    static async updateMe(req, res, next) {
        try {
            const updatedUser = await UserService.updateProfile(req.user.id, req.body);
            return sendResponse(res, 200, 'User profile updated successfully', { user: updatedUser });
        } catch (error) {
            next(error);
        }
    }

    static async deleteMe(req, res, next) {
        try {
            const result = await UserService.deleteAccount(req.user.id);
            return sendResponse(res, 200, result.message, result);
        } catch (error) {
            next(error);
        }
    }

    static async getSavedDestinations(req, res, next) {
        try {
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 20;
            const result = await UserService.getSavedDestinations(req.user.id, page, limit);
            return sendResponse(res, 200, 'Saved destinations retrieved', result.items, result.meta);
        } catch (error) {
            next(error);
        }
    }

    static async saveDestination(req, res, next) {
        try {
            const { cityId, notes } = req.body;
            const result = await UserService.saveDestination(req.user.id, cityId, notes);
            return sendResponse(res, 201, 'Destination saved successfully', result);
        } catch (error) {
            next(error);
        }
    }

    static async removeSavedDestination(req, res, next) {
        try {
            const { cityId } = req.params;
            const result = await UserService.removeSavedDestination(req.user.id, cityId);
            return sendResponse(res, 200, result.message, result);
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;
