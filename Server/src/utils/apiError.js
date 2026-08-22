export class ApiError extends Error {
    /**
     * @param {number} statusCode
     * @param {string} message
     * @param {string} [error]
     * @param {any} [details]
     */
    constructor(statusCode, message, error = 'INTERNAL_ERROR', details = null) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;
