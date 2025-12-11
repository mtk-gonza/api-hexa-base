import { ZodError } from 'zod';
import { AuthUseCases } from './../../../application/use_cases/auth_use_cases.js';
import { UserRepositoryImpl } from './../../repositories/user_repository_impl.js';
import { AuthRepositoryImpl } from './../../repositories/auth_repository_impl.js';
import * as passwordUtil from './../../../utils/password_utils.js';
import * as jwtUtil from './../../../utils/jwt_handler.js';
import { loginSchema, registerSchema } from './../schemas/auth_schema.js';

const authUseCases = new AuthUseCases({
	userRepository: new UserRepositoryImpl(),
	authRepository: new AuthRepositoryImpl(),
	passwordUtil,
	jwtUtil
});

export const register = async (req, res) => {
	try {
		const parsed = registerSchema.parse(req.body);
		const created = await authUseCases.register(parsed);
		return res.status(201).json({ success: true, data: created });
	} catch (err) {
		if (err instanceof ZodError) {
			return res.status(400).json({ success: false, detail: 'Validation error', issues: err.errors });
		}
		return res.status(400).json({ success: false, detail: err.message || 'Unexpected error' });
	}
};

export const login = async (req, res) => {
	try {
		const parsed = loginSchema.parse(req.body);
		const user  = await authUseCases.login(parsed);
		return res.status(200).json({ success: true, data: user });
	} catch (err) {
		return res.status(401).json({ success: false, message: err.message, detail: err });
	}
};

export const refresh = async (req, res) => {
	try {
		const { refresh_token } = req.body || {};
		const result = await authUseCases.refresh({ refresh_token });
		return res.status(200).json({ success: true, data: result });
	} catch (err) {
		return res.status(401).json({ success: false, message: err.message, detail: err });
	}
};

export const logout = async (req, res) => {
	try {
		const { access_token, refresh_token } = req.body || {};
		const result = await authUseCases.logout({ access_token, refresh_token });
		return res.status(200).json({ success: true, data: result });
	} catch (err) {
		return res.status(400).json({ success: false, detail: err.message || 'Unexpected error' });
	}
};