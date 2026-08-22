import { DiscoveryService } from './discovery.service.js';
import { sendResponse } from '../../utils/apiResponse.js';

export class DiscoveryController {
    static async searchCities(req, res, next) {
        try {
            const { q, country, costIndex, page, limit } = req.query;
            const result = await DiscoveryService.searchCities({
                q,
                country,
                costIndex,
                page: page ? parseInt(page, 10) : 1,
                limit: limit ? parseInt(limit, 10) : 20,
            });
            return sendResponse(res, 200, 'Cities retrieved successfully', result.items, result.meta);
        } catch (error) {
            next(error);
        }
    }

    static async getPopularCities(req, res, next) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 8;
            const items = await DiscoveryService.getPopularCities(limit);
            return sendResponse(res, 200, 'Popular cities retrieved', items);
        } catch (error) {
            next(error);
        }
    }

    static async getCityById(req, res, next) {
        try {
            const { cityId } = req.params;
            const city = await DiscoveryService.getCityById(cityId);
            return sendResponse(res, 200, 'City details retrieved', { city });
        } catch (error) {
            next(error);
        }
    }

    static async searchActivities(req, res, next) {
        try {
            const { q, cityId, category, maxCost, maxDuration, page, limit } = req.query;
            const result = await DiscoveryService.searchActivities({
                q,
                cityId,
                category,
                maxCost: maxCost ? parseFloat(maxCost) : undefined,
                maxDuration: maxDuration ? parseInt(maxDuration, 10) : undefined,
                page: page ? parseInt(page, 10) : 1,
                limit: limit ? parseInt(limit, 10) : 20,
            });
            return sendResponse(res, 200, 'Activities retrieved successfully', result.items, result.meta);
        } catch (error) {
            next(error);
        }
    }

    static async getCitySuggestions(req, res, next) {
        try {
            const { cityId } = req.params;
            const { pattern } = req.query;
            const result = await DiscoveryService.getSuggestions(cityId, pattern);
            return sendResponse(res, 200, 'Suggestions retrieved', result);
        } catch (error) {
            next(error);
        }
    }
}

export default DiscoveryController;
