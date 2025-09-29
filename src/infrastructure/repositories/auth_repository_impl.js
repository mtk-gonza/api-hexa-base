import { AuthRepositoryPort } from './../../application/ports/auth_repository_port.js';
import { RefreshTokenModel } from './../db/sequelize/models/refresh_token_model.js';

const blacklistedAccessTokens = new Map();

export class AuthRepositoryImpl extends AuthRepositoryPort {
	async storeRefreshToken(userId, refreshToken, expiresAt) {
		await RefreshTokenModel.create({ user_id: userId, refresh_token: refreshToken, expires_at: new Date(expiresAt) });
		return true;
	}

	async findRefreshToken(refreshToken) {
		const row = await RefreshTokenModel.findOne({ where: { refresh_token: refreshToken } });
		if (!row) return null;
		if (row.expires_at && new Date(row.expires_at).getTime() < Date.now()) {
			await row.destroy();
			return null;
		}
		return { userId: row.user_id, expiresAt: row.expires_at ? new Date(row.expires_at).getTime() : null };
	}

	async revokeRefreshToken(refreshToken) {
		await RefreshTokenModel.destroy({ where: { refresh_token: refreshToken } });
		return true;
	}

	async blacklistAccessToken(token, expiresAt) {
		blacklistedAccessTokens.set(token, expiresAt || null);
		return true;
	}

	async isAccessTokenBlacklisted(token) {
		const exp = blacklistedAccessTokens.get(token);
		if (!exp) return false;
		if (exp && exp < Date.now()) {
			blacklistedAccessTokens.delete(token);
			return false;
		}
		return true;
	}
}
