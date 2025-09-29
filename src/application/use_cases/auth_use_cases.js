import settings from './../../config/settings.js';

export class AuthUseCases {
	constructor({ userRepository, passwordUtil, jwtUtil, authRepository }) {
		this.userRepository = userRepository;
		this.passwordUtil = passwordUtil;
		this.jwtUtil = jwtUtil;
		this.authRepository = authRepository;
	}

	async register({ username, email, password, first_name, last_name }) {
		const existsEmail = await this.userRepository.findByEmail(email);
		if (existsEmail) throw new Error('Email already in use');

		const existsUser = await this.userRepository.findByUsername(username);
		if (existsUser) throw new Error('Username already in use');

		const hashed = await this.passwordUtil.hashPassword(password);
		const created = await this.userRepository.create({ username, email, password: hashed, first_name, last_name, is_active: true });
		return created;
	}

	async login({ email, password }) {
		const user = await this.userRepository.findByEmail(email);
		if (!user) throw new Error('Invalid credentials');
		const ok = await this.passwordUtil.comparePassword(password, user.password);
		if (!ok) throw new Error('Invalid credentials');
		const roles = (user.roles || []).map(r => r.name);
		const accessToken = this.jwtUtil.sign({ id: user.id, username: user.username, email: user.email, roles });
		// Generar refresh token (simple UUID-like)
		const refreshToken = `${user.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
		const expiresMs = parseDurationMs(settings.REFRESH_EXPIRES_IN || '7d');
		await this.authRepository?.storeRefreshToken(user.id, refreshToken, Date.now() + expiresMs);
		return { user, access_token: accessToken, refresh_token: refreshToken };
	}

	async refresh({ refresh_token }) {
		if (!refresh_token) throw new Error('Missing refresh token');
		const entry = await this.authRepository?.findRefreshToken(refresh_token);
		if (!entry) throw new Error('Invalid refresh token');
		const user = await this.userRepository.findById(entry.userId);
		if (!user) throw new Error('User not found');
		const roles = (user.roles || []).map(r => r.name);
		const accessToken = this.jwtUtil.sign({ id: user.id, username: user.username, email: user.email, roles });
		return { access_token: accessToken };
	}

	async logout({ access_token, refresh_token }) {
		if (access_token) {
			await this.authRepository?.blacklistAccessToken(access_token, null);
		}
		if (refresh_token) {
			await this.authRepository?.revokeRefreshToken(refresh_token);
		}
		return { success: true };
	}
}

function parseDurationMs(str) {
	// Soporta valores tipo "7d", "12h", "30m"; fallback a ms si número
	const m = String(str).match(/^(\d+)(ms|s|m|h|d)?$/);
	if (!m) return 7 * 24 * 60 * 60 * 1000;
	const value = Number(m[1]);
	switch (m[2]) {
		case 'ms': return value;
		case 's': return value * 1000;
		case 'm': return value * 60 * 1000;
		case 'h': return value * 60 * 60 * 1000;
		case 'd': return value * 24 * 60 * 60 * 1000;
		default: return value; // as ms
	}
}