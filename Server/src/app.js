import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import tripRoutes from './modules/trips/trip.routes.js';
import itineraryRoutes from './modules/itinerary/itinerary.routes.js';
import discoveryRoutes from './modules/discovery/discovery.routes.js';
import budgetRoutes from './modules/budget/budget.routes.js';
import communityRoutes from './modules/community/community.routes.js';
import adminRoutes from './modules/admin/admin.routes.js';

import { errorHandler } from './middleware/error.middleware.js';
import { ApiError } from './utils/apiError.js';

dotenv.config();

const app = express();

// Global Middlewares
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        credentials: true,
    })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(express.static('public'));

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'GlobeTrotter API is healthy and operational',
        timestamp: new Date().toISOString(),
    });
});

// Modular Route Mounts
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/trips', itineraryRoutes);
app.use('/api/v1/trips', budgetRoutes);
app.use('/api/v1/trips', communityRoutes);

// Direct top-level discovery & community alias routes according to specification
app.use('/api/v1', discoveryRoutes);      // /api/v1/cities/*, /api/v1/activities/*
app.use('/api/v1/community', communityRoutes);
app.use('/api/v1', communityRoutes);      // /api/v1/shared/*
app.use('/api/v1/admin', adminRoutes);

// Catch 404 for unhandled routes
app.use((req, res, next) => {
    next(new ApiError(404, `Route ${req.method} ${req.originalUrl} not found`, 'ROUTE_NOT_FOUND'));
});

// Centralized Global Error Handler Middleware
app.use(errorHandler);

export { app };
export default app;