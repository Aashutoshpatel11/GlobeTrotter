import { ApiError } from '../utils/apiError.js';

/**
 * Validates request data against Zod schemas.
 * @param {Object} schemas
 * @param {import('zod').ZodSchema} [schemas.body]
 * @param {import('zod').ZodSchema} [schemas.query]
 * @param {import('zod').ZodSchema} [schemas.params]
 */
export const validate = (schemas) => {
    return (req, res, next) => {
        try {
            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }
            if (schemas.query) {
                req.query = schemas.query.parse(req.query);
            }
            if (schemas.params) {
                req.params = schemas.params.parse(req.params);
            }
            next();
        } catch (error) {
            if (error.errors) {
                const formattedDetails = error.errors.map((err) => ({
                    field: err.path.join('.'),
                    issue: err.message,
                }));
                return next(new ApiError(400, 'Validation failed for request parameters', 'BAD_REQUEST', formattedDetails));
            }
            next(error);
        }
    };
};

export default validate;
