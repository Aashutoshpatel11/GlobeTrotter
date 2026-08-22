import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';

const authRoutes = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default authRoutes;