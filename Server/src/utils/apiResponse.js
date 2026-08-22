/**
 * Formats standard successful API responses.
 * @param {import('express').Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {any} data
 * @param {any} meta
 */
export const sendResponse = (res, statusCode = 200, message = 'Success', data = {}, meta = undefined) => {
    const payload = {
        success: true,
        statusCode,
        message,
        data,
    };
    if (meta !== undefined) {
        payload.meta = meta;
    }
    return res.status(statusCode).json(payload);
};

export default sendResponse;
