import { mapperColumns } from './../../../../utils/mapper_columns.js';
import { REFRESH_TOKEN_COLUMNS } from '../columns/refresh_token_columns.js';
import { sequelize } from './../database.js';

const mappedColumns = mapperColumns(REFRESH_TOKEN_COLUMNS);

export const RefreshTokenModel = sequelize.define('RefreshToken', mappedColumns, {
	tableName: 'refresh_tokens',
	timestamps: false
});
