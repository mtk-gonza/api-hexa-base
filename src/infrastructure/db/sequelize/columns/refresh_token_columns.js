export const REFRESH_TOKEN_COLUMNS = {
	id: {
		type: 'INTEGER',
		primaryKey: true,
		autoIncrement: true
	},
	user_id: {
		type: 'INTEGER',
		allowNull: false
	},
	refresh_token: {
		type: 'STRING(255)',
		allowNull: false,
		unique: true
	},
	expires_at: {
		type: 'DATE',
		allowNull: true
	},
	created_at: {
		type: 'DATE',
		allowNull: false,
		defaultValue: 'CURRENT_TIMESTAMP'
	}
};
