export class AuthRepositoryPort {
	async storeRefreshToken(userId, refreshToken, expiresAt) {
		throw new Error('Not implemented');
	}

	async findRefreshToken(refreshToken) {
		throw new Error('Not implemented');
	}

	async revokeRefreshToken(refreshToken) {
		throw new Error('Not implemented');
	}

	async blacklistAccessToken(token, expiresAt) {
		throw new Error('Not implemented');
	}

	async isAccessTokenBlacklisted(token) {
		throw new Error('Not implemented');
	}
}
