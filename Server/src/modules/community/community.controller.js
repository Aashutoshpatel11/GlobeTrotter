import { CommunityService } from './community.service.js';
import { sendResponse } from '../../utils/apiResponse.js';

export class CommunityController {
    static async getFeed(req, res, next) {
        try {
            const { search, sort, page, limit } = req.query;
            const result = await CommunityService.getFeed({
                search,
                sort,
                page: page ? parseInt(page, 10) : 1,
                limit: limit ? parseInt(limit, 10) : 15,
            });
            return sendResponse(res, 200, 'Community feed retrieved', result.items, result.meta);
        } catch (error) {
            next(error);
        }
    }

    static async getPublicTrip(req, res, next) {
        try {
            const { tripId } = req.params;
            const result = await CommunityService.getPublicTrip(tripId, req.user ? req.user.id : null);
            return sendResponse(res, 200, 'Public trip retrieved', result);
        } catch (error) {
            next(error);
        }
    }

    static async generateShareLink(req, res, next) {
        try {
            const { tripId } = req.params;
            const result = await CommunityService.generateShareLink(tripId, req.user.id, req.body);
            return sendResponse(res, 200, 'Share link generated successfully', result);
        } catch (error) {
            next(error);
        }
    }

    static async getSharedTrip(req, res, next) {
        try {
            const { shareToken } = req.params;
            const result = await CommunityService.getSharedTrip(shareToken);
            return sendResponse(res, 200, 'Shared trip retrieved', result);
        } catch (error) {
            next(error);
        }
    }

    static async toggleLike(req, res, next) {
        try {
            const { tripId } = req.params;
            const result = await CommunityService.toggleLikeTrip(tripId, req.user.id);
            return sendResponse(res, 200, 'Like status updated', result);
        } catch (error) {
            next(error);
        }
    }

    static async copyTrip(req, res, next) {
        try {
            const { tripId } = req.params;
            const { newStartDate } = req.body;
            const result = await CommunityService.copyTrip(tripId, req.user.id, newStartDate);
            return sendResponse(res, 201, result.message, result);
        } catch (error) {
            next(error);
        }
    }
}

export default CommunityController;
