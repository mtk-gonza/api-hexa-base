import { mapperColumns } from './../../../../utils/mapper_columns.js';
import { USER_COLUMNS } from '../columns/user_columns.js'
import { sequelize } from './../database.js';

const mappedColumns = mapperColumns(USER_COLUMNS);

export const UserModel = sequelize.define('User', mappedColumns, {
    tableName: 'users',
    timestamps: false
});