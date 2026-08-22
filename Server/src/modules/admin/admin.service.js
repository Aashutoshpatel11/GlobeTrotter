import { Op } from 'sequelize';
import {
    User,
    Trip,
    DestinationCity,
    TripStop,
    ActivityCatalog,
    SavedDestination,
    sequelize,
} from '../../models/index.js';
import { ApiError } from '../../utils/apiError.js';

export class AdminService {
    static async getOverviewAnalytics(timeframe = '30d') {
        let dateThreshold = new Date();
        if (timeframe === '30d') {
            dateThreshold.setDate(dateThreshold.getDate() - 30);
        } else if (timeframe === '90d') {
            dateThreshold.setDate(dateThreshold.getDate() - 90);
        } else if (timeframe === '1y') {
            dateThreshold.setFullYear(dateThreshold.getFullYear() - 1);
        } else {
            dateThreshold = new Date(0); // All time
        }

        const [
            totalUsers,
            activeTrips,
            totalTripsCreated,
            totalDestinationsSaved,
            totalBudgetSum,
        ] = await Promise.all([
            User.count(),
            Trip.count({ where: { status: 'ONGOING' } }),
            Trip.count({ where: { created_at: { [Op.gte]: dateThreshold } } }),
            SavedDestination.count(),
            Trip.sum('total_budget') || 0,
        ]);

        return {
            timeframe,
            totalUsers,
            activeTrips,
            totalTripsCreated,
            totalDestinationsSaved,
            totalPlannedBudget: parseFloat(totalBudgetSum.toFixed(2)),
        };
    }

    static async getTrends() {
        // Top Cities based on popularity score and trip stops
        const topCities = await DestinationCity.findAll({
            order: [['popularity_score', 'DESC']],
            limit: 5,
            attributes: ['id', 'name', 'country', 'popularity_score', 'cover_image_url'],
        });

        // Top activity categories
        const categoryCounts = await ActivityCatalog.findAll({
            attributes: ['category', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
            group: ['category'],
            order: [[sequelize.literal('count'), 'DESC']],
        });

        return {
            topCities,
            activityCategories: categoryCounts,
        };
    }

    static async listUsers({ search, role, page = 1, limit = 25 }) {
        const offset = (page - 1) * limit;
        const whereClause = {};

        if (search) {
            whereClause[Op.or] = [
                { first_name: { [Op.iLike]: `%${search}%` } },
                { last_name: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
            ];
        }

        if (role) {
            whereClause.role = role;
        }

        const { rows, count } = await User.findAndCountAll({
            where: whereClause,
            attributes: { exclude: ['password_hash'] },
            order: [['created_at', 'DESC']],
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

    static async updateUserStatus(userId, isActive) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new ApiError(404, 'User not found', 'NOT_FOUND');
        }

        await user.update({ is_active: isActive });

        const updated = user.toJSON();
        delete updated.password_hash;
        return updated;
    }
}

export default AdminService;
