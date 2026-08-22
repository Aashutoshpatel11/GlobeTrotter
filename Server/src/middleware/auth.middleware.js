import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken && !refreshToken) {
        return res.status(401).json({ 
            success: false, 
            message: 'Authentication required. Please log in.' 
        });
    }

    try {
        if (accessToken) {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded; 
            return next();
        }
    } catch (error) {
        if (error.name !== 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid access token.' 
            });
        }
    }

    if (!refreshToken) {
        return res.status(401).json({ 
            success: false, 
            message: 'Access token expired and no refresh token provided.' 
        });
    }

    try {
        const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const newAccessToken = jwt.sign(
            { id: decodedRefresh.id, role: decodedRefresh.role }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' } 
        );

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict', 
            maxAge: 15 * 60 * 1000 
        });

        req.user = { id: decodedRefresh.id, role: decodedRefresh.role };
        return next();
        
    } catch (error) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(403).json({ 
            success: false, 
            message: 'Session expired. Please log in again.' 
        });
    }
};