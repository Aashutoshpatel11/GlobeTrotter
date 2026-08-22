import { ItineraryService } from './itinerary.service.js';
import { sendResponse } from '../../utils/apiResponse.js';

export class ItineraryController {
    static async addItemToDay(req, res, next) {
        try {
            const { dayId } = req.params;
            const item = await ItineraryService.addItemToDay(dayId, req.user.id, req.body);
            return sendResponse(res, 201, 'Activity item added to itinerary day', { item });
        } catch (error) {
            next(error);
        }
    }

    static async updateActivityItem(req, res, next) {
        try {
            const { itemId } = req.params;
            const item = await ItineraryService.updateActivityItem(itemId, req.user.id, req.body);
            return sendResponse(res, 200, 'Activity item updated successfully', { item });
        } catch (error) {
            next(error);
        }
    }

    static async deleteActivityItem(req, res, next) {
        try {
            const { itemId } = req.params;
            const result = await ItineraryService.deleteActivityItem(itemId, req.user.id);
            return sendResponse(res, 200, result.message, result);
        } catch (error) {
            next(error);
        }
    }

    static async rescheduleItem(req, res, next) {
        try {
            const result = await ItineraryService.rescheduleItem(req.user.id, req.body);
            return sendResponse(res, 200, 'Activity item rescheduled successfully', { updatedItem: result });
        } catch (error) {
            next(error);
        }
    }

    static async getTripTimeline(req, res, next) {
        try {
            const { tripId } = req.params;
            const timeline = await ItineraryService.getTripTimeline(tripId, req.user ? req.user.id : null);
            return sendResponse(res, 200, 'Trip timeline retrieved successfully', timeline);
        } catch (error) {
            next(error);
        }
    }

    static async getCalendarEvents(req, res, next) {
        try {
            const result = await ItineraryService.getCalendarEvents(req.user.id);
            return sendResponse(res, 200, 'Calendar events retrieved', result);
        } catch (error) {
            next(error);
        }
    }
}

export default ItineraryController;
