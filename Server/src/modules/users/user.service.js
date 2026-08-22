import { User, SavedDestination, DestinationCity } from '../../models/index.js';
import { ApiError } from '../../utils/apiError.js';

export class UserService {
    static async getProfile(userId) {
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password_hash'] },
        });

        if (!user) {
            throw new ApiError(404, 'User not found', 'NOT_FOUND');
        }

        return user;
    }

    static async updateProfile(userId, updateData) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new ApiError(404, 'User not found', 'NOT_FOUND');
        }

        const fieldsToUpdate = {};
        if (updateData.firstName !== undefined) fieldsToUpdate.first_name = updateData.firstName;
        if (updateData.lastName !== undefined) fieldsToUpdate.last_name = updateData.lastName;
        if (updateData.phone !== undefined) fieldsToUpdate.phone_number = updateData.phone;
        if (updateData.city !== undefined) fieldsToUpdate.city = updateData.city;
        if (updateData.country !== undefined) fieldsToUpdate.country = updateData.country;
        if (updateData.bio !== undefined) fieldsToUpdate.bio = updateData.bio;
        if (updateData.avatarUrl !== undefined) fieldsToUpdate.avatar_url = updateData.avatarUrl;
        if (updateData.preferredCurrency !== undefined) fieldsToUpdate.preferred_currency = updateData.preferredCurrency.toUpperCase();
        if (updateData.preferredLanguage !== undefined) fieldsToUpdate.preferred_language = updateData.preferredLanguage.toLowerCase();

        await user.update(fieldsToUpdate);

        const updatedUser = user.toJSON();
        delete updatedUser.password_hash;
        return updatedUser;
    }

    static async deleteAccount(userId) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new ApiError(404, 'User not found', 'NOT_FOUND');
        }

        await user.destroy();
        return { message: 'Your account and associated data have been permanently deleted.' };
    }

    static async getSavedDestinations(userId, page = 1, limit = 20) {
        const offset = (page - 1) * limit;

        const { rows, count } = await SavedDestination.findAndCountAll({
            where: { user_id: userId },
            include: [
                {
                    model: DestinationCity,
                    as: 'city',
                },
            ],
            limit,
            offset,
            order: [['created_at', 'DESC']],
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

    static async saveDestination(userId, cityId, notes = null) {
        const city = await DestinationCity.findByPk(cityId);
        if (!city) {
            throw new ApiError(404, 'Destination city not found', 'CITY_NOT_FOUND');
        }

        const existing = await SavedDestination.findOne({
            where: { user_id: userId, city_id: cityId },
        });

        if (existing) {
            if (notes !== null) {
                await existing.update({ notes });
            }
            return existing;
        }

        const saved = await SavedDestination.create({
            user_id: userId,
            city_id: cityId,
            notes,
        });

        return saved;
    }

    static async removeSavedDestination(userId, cityId) {
        const deleted = await SavedDestination.destroy({
            where: { user_id: userId, city_id: cityId },
        });

        if (!deleted) {
            throw new ApiError(404, 'Saved destination not found in your wishlist', 'NOT_FOUND');
        }

        return { message: 'Destination removed from saved list.' };
    }
}

export default UserService;
