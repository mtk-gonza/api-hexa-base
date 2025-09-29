import * as jwtUtil from './../../../utils/jwt_handler.js';
import { AuthRepositoryImpl } from './../../repositories/auth_repository_impl.js';

const authRepo = new AuthRepositoryImpl();

export const requireAuth = (req, res, next) => {
	try {
		const header = req.headers['authorization'] || '';
		const [, token] = header.split(' ');
		if (!token) return res.status(401).json({ success: false, detail: 'Missing bearer token' });
		if (authRepo.isAccessTokenBlacklisted && authRepo.isAccessTokenBlacklisted(token)) {
			return res.status(401).json({ success: false, detail: 'Token blacklisted' });
		}
		const payload = jwtUtil.verify(token);
		req.user = payload;
		return next();
	} catch (err) {
		return res.status(401).json({ success: false, detail: 'Invalid or expired token' });
	}
};

export const requireRoles = (...roles) => {
	return (req, res, next) => {
		try {
			const userRoles = req.user?.roles || [];
			const allowed = roles.some(r => userRoles.includes(r));
			if (!allowed) return res.status(403).json({ success: false, detail: 'Forbidden' });
			return next();
		} catch (err) {
			return res.status(403).json({ success: false, detail: 'Forbidden' });
		}
	};
};
