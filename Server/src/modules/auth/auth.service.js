import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../models/index.js';
import { ApiError } from '../../utils/apiError.js';

const JWT_SECRET = process.env.JWT_SECRET || 'globetrotter_jwt_access_secret_key_minimum_32_characters';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'globetrotter_jwt_refresh_secret_key_minimum_32_characters';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

const generateTokens = (user) => {
    const payload = {
        id: user.id,
        userId: user.id,
        email: user.email,
        role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

    return { token, refreshToken };
};

export class AuthService {
    static async register(data) {
        const existingUser = await User.findOne({ where: { email: data.email.toLowerCase() } });
        if (existingUser) {
            throw new ApiError(409, 'An account with this email address already exists', 'EMAIL_IN_USE');
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(data.password, salt);

        const newUser = await User.create({
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email.toLowerCase(),
            password_hash: passwordHash,
            phone_number: data.phone || null,
            city: data.city || null,
            country: data.country || null,
            bio: data.bio || null,
            role: 'TRAVELER',
        });

        const { token, refreshToken } = generateTokens(newUser);

        const userJson = newUser.toJSON();
        delete userJson.password_hash;

        return {
            user: userJson,
            token,
            refreshToken,
        };
    }

    static async login(email, password) {
        const user = await User.findOne({ where: { email: email.toLowerCase() } });
        if (!user) {
            throw new ApiError(401, 'Invalid email or password', 'INVALID_CREDENTIALS');
        }

        if (!user.is_active) {
            throw new ApiError(403, 'Your account has been deactivated. Please contact support.', 'ACCOUNT_DISABLED');
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            throw new ApiError(401, 'Invalid email or password', 'INVALID_CREDENTIALS');
        }

        const { token, refreshToken } = generateTokens(user);

        const userJson = user.toJSON();
        delete userJson.password_hash;

        return {
            user: userJson,
            token,
            refreshToken,
        };
    }

    static async refreshToken(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
            const user = await User.findByPk(decoded.id || decoded.userId);

            if (!user || !user.is_active) {
                throw new ApiError(401, 'Invalid or revoked refresh token', 'UNAUTHORIZED');
            }

            const { token, refreshToken: newRefreshToken } = generateTokens(user);

            return {
                token,
                refreshToken: newRefreshToken,
            };
        } catch (error) {
            throw new ApiError(401, 'Invalid or expired refresh token', 'TOKEN_EXPIRED');
        }
    }

    static async forgotPassword(email) {
        const user = await User.findOne({ where: { email: email.toLowerCase() } });
        if (!user) {
            // For security, return success message even if email isn't registered
            return { message: 'If an account exists with this email, password reset instructions have been sent.' };
        }

        const resetToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        return {
            message: 'Password reset link sent to your registered email address.',
            resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined,
        };
    }

    static async resetPassword(token, newPassword) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const user = await User.findByPk(decoded.id);

            if (!user) {
                throw new ApiError(400, 'Invalid or expired password reset token', 'INVALID_TOKEN');
            }

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(newPassword, salt);

            await user.update({ password_hash: passwordHash });

            return { message: 'Password has been successfully updated. You may now log in.' };
        } catch (error) {
            throw new ApiError(400, 'Invalid or expired password reset token', 'INVALID_TOKEN');
        }
    }
}

export default AuthService;
