import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError.js';
import { User } from '../models/index.js';

export const authenticate = async (req, res, next) => {
    try {
        let token = null;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            throw new ApiError(401, 'Authentication token missing or malformed', 'UNAUTHORIZED');
        }

        const secret = process.env.JWT_SECRET || 'globetrotter_jwt_access_secret_key_minimum_32_characters';
        const decoded = jwt.verify(token, secret);

        const user = await User.findByPk(decoded.id || decoded.userId);

        if (!user) {
            throw new ApiError(401, 'User associated with this token no longer exists', 'UNAUTHORIZED');
        }

        if (!user.is_active) {
            throw new ApiError(403, 'User account has been suspended or deactivated', 'ACCOUNT_INACTIVE');
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return next(new ApiError(401, 'Invalid authentication token', 'INVALID_TOKEN'));
        }
        if (error.name === 'TokenExpiredError') {
            return next(new ApiError(401, 'Authentication token expired', 'TOKEN_EXPIRED'));
        }
        next(error);
    }
};

export const optionalAuth = async (req, res, next) => {
    try {
        let token = null;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (token) {
            const secret = process.env.JWT_SECRET || 'globetrotter_jwt_access_secret_key_minimum_32_characters';
            const decoded = jwt.verify(token, secret);
            const user = await User.findByPk(decoded.id || decoded.userId);
            if (user && user.is_active) {
                req.user = user;
            }
        }
        next();
    } catch {
        // Continue unauthenticated for optional auth
        next();
    }
};

export default authenticate;
