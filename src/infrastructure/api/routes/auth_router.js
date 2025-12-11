import { Router } from 'express';
import * as authController from './../controllers/auth_controller.js';
import { validateBody } from './../middlewares/request_middleware.js';
import { loginSchema, registerSchema } from './../schemas/auth_schema.js'

const router = Router();

router.post('/register', validateBody(registerSchema), authController.register);
router.post('/login', validateBody(loginSchema), authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

export default router;