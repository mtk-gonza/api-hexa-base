import { mapperColumns } from './../../../../utils/mapper_columns.js';
import { USER_ROLES_COLUMNS } from '../columns/user_roles_columns.js'
import { sequelize } from './../database.js';

const mappedColumns = mapperColumns(USER_ROLES_COLUMNS);

export const UserRolesModel = sequelize.define('user_roles', mappedColumns, {
    tableName: 'user_roles',
    timestamps: false
});