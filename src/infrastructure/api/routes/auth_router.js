import express from 'express';
import { register, login, refresh, logout } from './../controllers/auth_controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
