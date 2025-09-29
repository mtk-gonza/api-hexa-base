const fs = require('fs');
const path = require('path');

function detectCliEnv() {
	const args = process.argv || [];
	const idx = args.indexOf('--env');
	if (idx >= 0 && args[idx + 1]) return String(args[idx + 1]);
	return 'development';
}

function loadDotenvFiles() {
	const selectedEnv = detectCliEnv();
	const root = process.cwd();
	const baseEnv = path.join(root, '.env');
	const specificEnv = path.join(root, `.env.${selectedEnv}`);
	if (fs.existsSync(baseEnv)) {
		require('dotenv').config({ path: baseEnv });
	}
	if (fs.existsSync(specificEnv)) {
		require('dotenv').config({ path: specificEnv });
	}
}

loadDotenvFiles();

function makeConfig(env) {
	const DIALECT = process.env.DB_DIALECT || 'sqlite';
	const NODE_ENV = process.env.NODE_ENV || 'development';
	const common = { dialect: DIALECT, logging: false };

	if (DIALECT === 'sqlite') {
		let storage = process.env.DB_STORAGE;
		if (!storage) {
			storage = NODE_ENV === 'test' ? 'api-hexa_test.sqlite' : NODE_ENV === 'production' ? 'api-hexa.sqlite' : 'api-hexa-dev.sqlite';
		}
		return { ...common, storage };
	}

	if (process.env.DATABASE_URL) {
		return { ...common, use_env_variable: 'DATABASE_URL' };
	}

	const username = process.env.DB_USER || 'root';
	const password = process.env.DB_PASSWORD || null;
	const database = process.env.DB_NAME || `api_hexa_${env}`;
	const host = process.env.DB_HOST || 'localhost';
	const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined;

	return { ...common, username, password, database, host, port };
}

module.exports = {
	development: makeConfig('development'),
	test: makeConfig('test'),
	production: makeConfig('production')
};
