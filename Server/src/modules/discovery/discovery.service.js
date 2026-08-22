import { Op } from 'sequelize';
import { DestinationCity, ActivityCatalog } from '../../models/index.js';
import { ApiError } from '../../utils/apiError.js';

export class DiscoveryService {
    static async searchCities({ q, country, costIndex, page = 1, limit = 20 }) {
        const offset = (page - 1) * limit;
        const whereClause = {};

        if (q) {
            whereClause[Op.or] = [
                { name: { [Op.iLike]: `%${q}%` } },
                { country: { [Op.iLike]: `%${q}%` } },
                { state_region: { [Op.iLike]: `%${q}%` } },
            ];
        }

        if (country) {
            whereClause.country = { [Op.iLike]: `%${country}%` };
        }

        if (costIndex) {
            whereClause.cost_index = costIndex;
        }

        const { rows, count } = await DestinationCity.findAndCountAll({
            where: whereClause,
            order: [['popularity_score', 'DESC'], ['name', 'ASC']],
            limit,
            offset,
        });

        return {
            items: rows,
            meta: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit),
            },
        };
    }

    static async getPopularCities(limit = 8) {
        const cities = await DestinationCity.findAll({
            order: [['popularity_score', 'DESC']],
            limit,
        });
        return cities;
    }

    static async getCityById(cityId) {
        const city = await DestinationCity.findByPk(cityId, {
            include: [
                {
                    model: ActivityCatalog,
                    as: 'activities',
                    limit: 10,
                    order: [['rating', 'DESC']],
                },
            ],
        });

        if (!city) {
            throw new ApiError(404, 'Destination city not found', 'NOT_FOUND');
        }

        return city;
    }

    static async searchActivities({ q, cityId, category, maxCost, maxDuration, page = 1, limit = 20 }) {
        const offset = (page - 1) * limit;
        const whereClause = {};

        if (q) {
            whereClause[Op.or] = [
                { title: { [Op.iLike]: `%${q}%` } },
                { description: { [Op.iLike]: `%${q}%` } },
            ];
        }

        if (cityId) {
            whereClause.city_id = cityId;
        }

        if (category) {
            whereClause.category = category;
        }

        if (maxCost !== undefined) {
            whereClause.estimated_cost = { [Op.lte]: maxCost };
        }

        if (maxDuration !== undefined) {
            whereClause.estimated_duration_mins = { [Op.lte]: maxDuration };
        }

        const { rows, count } = await ActivityCatalog.findAndCountAll({
            where: whereClause,
            include: [{ model: DestinationCity, as: 'city' }],
            order: [['rating', 'DESC'], ['title', 'ASC']],
            limit,
            offset,
        });

        return {
            items: rows,
            meta: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit),
            },
        };
    }

    static async getSuggestions(cityId, pattern = null) {
        const city = await DestinationCity.findByPk(cityId);
        if (!city) {
            throw new ApiError(404, 'City not found', 'NOT_FOUND');
        }

        const whereClause = { city_id: cityId };
        if (pattern) {
            const normalizedPattern = pattern.toUpperCase();
            if (['SIGHTSEEING', 'FOOD_AND_DRINK', 'ADVENTURE', 'CULTURE', 'RELAXATION', 'SHOPPING', 'NIGHTLIFE'].includes(normalizedPattern)) {
                whereClause.category = normalizedPattern;
            }
        }

        const suggestedActivities = await ActivityCatalog.findAll({
            where: whereClause,
            order: [['rating', 'DESC']],
            limit: 6,
        });

        return {
            city,
            suggestedActivities,
        };
    }
}

export default DiscoveryService;
