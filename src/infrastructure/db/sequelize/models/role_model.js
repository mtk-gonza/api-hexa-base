import { mapperColumns } from './../../../../utils/mapper_columns.js';
import { ROLE_COLUMNS } from '../columns/role_columns.js';
import { sequelize } from './../database.js';

const mappedColumns = mapperColumns(ROLE_COLUMNS);

export const RoleModel = sequelize.define('Role', mappedColumns, {
    tableName: 'roles',
    timestamps: false
});