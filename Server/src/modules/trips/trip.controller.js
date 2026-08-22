import { TripService } from './trip.service.js';
import { sendResponse } from '../../utils/apiResponse.js';

export class TripController {
    static async listUserTrips(req, res, next) {
        try {
            const { status, page, limit } = req.query;
            const result = await TripService.listUserTrips(
                req.user.id,
                status,
                page ? parseInt(page, 10) : 1,
                limit ? parseInt(limit, 10) : 10
            );
            return sendResponse(res, 200, 'Trips retrieved successfully', result.items, {
                ...result.meta,
                counts: result.counts,
            });
        } catch (error) {
            next(error);
        }
    }

    static async createTrip(req, res, next) {
        try {
            const trip = await TripService.createTrip(req.user.id, req.body);
            return sendResponse(res, 201, 'Trip created successfully', { trip });
        } catch (error) {
            next(error);
        }
    }

    static async getTripById(req, res, next) {
        try {
            const { tripId } = req.params;
            const trip = await TripService.getTripById(tripId, req.user ? req.user.id : null);
            return sendResponse(res, 200, 'Trip details retrieved', { trip });
        } catch (error) {
            next(error);
        }
    }

    static async updateTrip(req, res, next) {
        try {
            const { tripId } = req.params;
            const updatedTrip = await TripService.updateTrip(tripId, req.user.id, req.body);
            return sendResponse(res, 200, 'Trip updated successfully', { trip: updatedTrip });
        } catch (error) {
            next(error);
        }
    }

    static async deleteTrip(req, res, next) {
        try {
            const { tripId } = req.params;
            const result = await TripService.deleteTrip(tripId, req.user.id);
            return sendResponse(res, 200, result.message, result);
        } catch (error) {
            next(error);
        }
    }

    static async addStop(req, res, next) {
        try {
            const { tripId } = req.params;
            const stop = await TripService.addStop(tripId, req.user.id, req.body);
            return sendResponse(res, 201, 'Stop added to trip', { stop });
        } catch (error) {
            next(error);
        }
    }

    static async updateStop(req, res, next) {
        try {
            const { tripId, stopId } = req.params;
            const stop = await TripService.updateStop(tripId, stopId, req.user.id, req.body);
            return sendResponse(res, 200, 'Stop updated successfully', { stop });
        } catch (error) {
            next(error);
        }
    }

    static async reorderStops(req, res, next) {
        try {
            const { tripId } = req.params;
            const stops = await TripService.reorderStops(tripId, req.user.id, req.body.stopOrder);
            return sendResponse(res, 200, 'Stops reordered successfully', { stops });
        } catch (error) {
            next(error);
        }
    }

    static async deleteStop(req, res, next) {
        try {
            const { tripId, stopId } = req.params;
            const result = await TripService.deleteStop(tripId, stopId, req.user.id);
            return sendResponse(res, 200, result.message, result);
        } catch (error) {
            next(error);
        }
    }
}

export default TripController;
