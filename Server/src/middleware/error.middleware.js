import { ApiError } from '../utils/apiError.js';

export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let error = err.error || 'INTERNAL_SERVER_ERROR';
    let message = err.message || 'An unexpected error occurred on the server';
    let details = err.details || null;

    // Handle Sequelize Specific Errors
    if (err.name === 'SequelizeUniqueConstraintError') {
        statusCode = 409;
        error = 'CONFLICT';
        message = 'A resource with these unique parameters already exists';
        details = err.errors ? err.errors.map((e) => ({ field: e.path, issue: e.message })) : null;
    } else if (err.name === 'SequelizeValidationError') {
        statusCode = 400;
        error = 'BAD_REQUEST';
        message = 'Database field validation failed';
        details = err.errors ? err.errors.map((e) => ({ field: e.path, issue: e.message })) : null;
    } else if (err.name === 'SequelizeForeignKeyConstraintError') {
        statusCode = 400;
        error = 'FOREIGN_KEY_VIOLATION';
        message = 'Referenced entity does not exist';
    }

    if (process.env.NODE_ENV !== 'production' && statusCode === 500) {
        console.error('SERVER ERROR TRACE:', err);
    }

    const response = {
        success: false,
        statusCode,
        error,
        message,
    };

    if (details) {
        response.details = details;
    }

    return res.status(statusCode).json(response);
};

export default errorHandler;
