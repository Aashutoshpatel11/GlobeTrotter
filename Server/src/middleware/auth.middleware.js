import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError.js';
import { User } from '../models/index.js';

export const authenticate = async (req, res, next) => {
    try {
        let token = null;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && (req.cookies.accessToken || req.cookies.token)) {
            token = req.cookies.accessToken || req.cookies.token;
        }

        const accessSecret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET || 'globetrotter_jwt_access_secret_key_minimum_32_characters';
        const refreshSecret = process.env.REFRESH_TOKEN_SECRET || process.env.JWT_REFRESH_SECRET || 'globetrotter_jwt_refresh_secret_key_minimum_32_characters';

        if (!token) {
            // Check if refreshToken is present in cookies for auto-refresh
            const refreshToken = req.cookies?.refreshToken;
            if (refreshToken) {
                try {
                    const decodedRefresh = jwt.verify(refreshToken, refreshSecret);
                    const user = await User.findByPk(decodedRefresh.id || decodedRefresh.userId);

                    if (user && user.is_active) {
                        const newAccessToken = jwt.sign(
                            { id: user.id, userId: user.id, email: user.email, role: user.role },
                            accessSecret,
                            { expiresIn: '15m' }
                        );

                        res.cookie('accessToken', newAccessToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'strict',
                            maxAge: 15 * 60 * 1000,
                        });

                        req.user = user;
                        return next();
                    }
                } catch {
                    res.clearCookie('accessToken');
                    res.clearCookie('refreshToken');
                }
            }

            throw new ApiError(401, 'Authentication token missing or malformed. Please log in.', 'UNAUTHORIZED');
        }

        try {
            const decoded = jwt.verify(token, accessSecret);
            const user = await User.findByPk(decoded.id || decoded.userId);

            if (!user) {
                throw new ApiError(401, 'User associated with this token no longer exists', 'UNAUTHORIZED');
            }

            if (!user.is_active) {
                throw new ApiError(403, 'User account has been suspended or deactivated', 'ACCOUNT_INACTIVE');
            }

            req.user = user;
            return next();
        } catch (tokenErr) {
            if (tokenErr.name === 'TokenExpiredError' && req.cookies?.refreshToken) {
                // Attempt refresh fallback
                try {
                    const decodedRefresh = jwt.verify(req.cookies.refreshToken, refreshSecret);
                    const user = await User.findByPk(decodedRefresh.id || decodedRefresh.userId);

                    if (user && user.is_active) {
                        const newAccessToken = jwt.sign(
                            { id: user.id, userId: user.id, email: user.email, role: user.role },
                            accessSecret,
                            { expiresIn: '15m' }
                        );

                        res.cookie('accessToken', newAccessToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'strict',
                            maxAge: 15 * 60 * 1000,
                        });

                        req.user = user;
                        return next();
                    }
                } catch {
                    res.clearCookie('accessToken');
                    res.clearCookie('refreshToken');
                }
            }
            throw tokenErr;
        }
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
        } else if (req.cookies && (req.cookies.accessToken || req.cookies.token)) {
            token = req.cookies.accessToken || req.cookies.token;
        }

        if (token) {
            const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET || 'globetrotter_jwt_access_secret_key_minimum_32_characters';
            const decoded = jwt.verify(token, secret);
            const user = await User.findByPk(decoded.id || decoded.userId);
            if (user && user.is_active) {
                req.user = user;
            }
        }
        next();
    } catch {
        next();
    }
};

export const authenticateUser = authenticate;

export default authenticate;
