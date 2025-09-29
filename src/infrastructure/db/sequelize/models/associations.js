import { UserModel } from './user_model.js';
import { RoleModel } from './role_model.js';
import { UserRolesModel } from './user_roles_model.js';

UserModel.belongsToMany(RoleModel, {
    through: UserRolesModel,
    as: 'roles',
    foreignKey: 'user_id',
    otherKey: 'role_id'
});

RoleModel.belongsToMany(UserModel, {
    through: UserRolesModel,
    as: 'users',
    foreignKey: 'role_id',
    otherKey: 'user_id'
});