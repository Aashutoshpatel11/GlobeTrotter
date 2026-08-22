import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { setTokenCookies } from '../utils/token.js';

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, city, country, bio } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                error: 'BAD_REQUEST',
                message: 'First name, last name, email, and password are required.'
            });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: 'CONFLICT',
                message: 'User with this email already exists.'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            first_name: firstName,
            last_name: lastName,
            email,
            password_hash,
            phone_number: phone || null,
            city: city || null,
            country: country || null,
            bio: bio || null
        });

        setTokenCookies(res, newUser);

        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'User registered successfully',
            data: {
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    firstName: newUser.first_name,
                    lastName: newUser.last_name,
                    role: newUser.role
                }
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({
            success: false,
            error: 'INTERNAL_SERVER_ERROR',
            message: 'An error occurred during registration.'
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'BAD_REQUEST',
                message: 'Email and password are required.'
            });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'UNAUTHORIZED',
                message: 'Invalid credentials.'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'UNAUTHORIZED',
                message: 'Invalid credentials.'
            });
        }

        setTokenCookies(res, user);

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    role: user.role
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            error: 'INTERNAL_SERVER_ERROR',
            message: 'An error occurred during login.'
        });
    }
};

export const logout = async (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Logged out successfully'
    });
};