import { AuthService } from './auth.service.js';
import { sendResponse } from '../../utils/apiResponse.js';

export class AuthController {
    static async register(req, res, next) {
        try {
            const result = await AuthService.register(req.body);
            return sendResponse(res, 201, 'User registered successfully', result);
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await AuthService.login(email, password);
            return sendResponse(res, 200, 'Login successful', result);
        } catch (error) {
            next(error);
        }
    }

    static async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const result = await AuthService.refreshToken(refreshToken);
            return sendResponse(res, 200, 'Token refreshed successfully', result);
        } catch (error) {
            next(error);
        }
    }

    static async forgotPassword(req, res, next) {
        try {
            const { email } = req.body;
            const result = await AuthService.forgotPassword(email);
            return sendResponse(res, 200, result.message, result);
        } catch (error) {
            next(error);
        }
    }

    static async resetPassword(req, res, next) {
        try {
            const { token, newPassword } = req.body;
            const result = await AuthService.resetPassword(token, newPassword);
            return sendResponse(res, 200, result.message, result);
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
