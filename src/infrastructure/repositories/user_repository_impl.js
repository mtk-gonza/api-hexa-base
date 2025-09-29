import { UserRepositoryPort } from './../../application/ports/user_repository_port.js';
import { UserModel } from './../db/sequelize/models/user_model.js';
import { User } from './../../domain/models/user.js';
import { RoleModel } from './../db/sequelize/models/role_model.js';
import { UserRolesModel } from './../db/sequelize/models/user_roles_model.js';

export class UserRepositoryImpl extends UserRepositoryPort {
    constructor() {
        super();
    }
    #toEntity(userInstance) {
        return new User({
            id: userInstance.id,
            username: userInstance.username,
            email: userInstance.email,
            password: userInstance.password,
            first_name: userInstance.first_name,
            last_name: userInstance.last_name,
            phone: userInstance.phone,
            is_active: userInstance.is_active,
            roles: userInstance.roles?.map(role => ({
                id: role.id,
                name: role.name,
                created_at: role.created_at,
                updated_at: role.updated_at
            })) || [],
            created_at: userInstance.created_at,
            updated_at: userInstance.updated_at
        })
    }
    async findAll() {
        const users = await UserModel.findAll({
            include: [{ model: RoleModel, as: 'roles' }]
        });
        return users.map(user => this.#toEntity(user));
    }

    async findById(id) {
        const user = await UserModel.findByPk(id, {
            include: [{ model: RoleModel, as: 'roles' }]
        });
        return user ? this.#toEntity(user) : null;
    }

    async findByEmail(email) {
        const user = await UserModel.findOne({
            where: { email },
            include: [{ model: RoleModel, as: 'roles' }]
        });
        return user ? this.#toEntity(user) : null;
    }

    async findByUsername(username) {
        const user = await UserModel.findOne({
            where: { username },
            include: [{ model: RoleModel, as: 'roles' }]
        });
        return user ? this.#toEntity(user) : null;
    }

    async create(userEntity) {
        const user = await UserModel.create({
            username: userEntity.username,
            email: userEntity.email,
            password: userEntity.password,
            first_name: userEntity.first_name,
            last_name: userEntity.last_name,
            phone: userEntity.phone,
            is_active: userEntity.is_active,        
        })
        if (userEntity.roles?.length) {
            const roleIds = userEntity.roles.map(role => role.id);
            await user.setRoles(roleIds);
        }
        const userWithRoles = await UserModel.findByPk(user.id, {
            include: [{ model: RoleModel, as: 'roles' }]
        });
        return this.#toEntity(userWithRoles);
    }

    async update(id, userEntity) {
        const user = await UserModel.findByPk(id, {
            include: [{ model: RoleModel, as: 'roles' }]
        });
        if (!user) return null;

        user.username = userEntity.username ?? user.username;
        user.email = userEntity.email ?? user.email;
        user.password = userEntity.password ?? user.password;
        user.first_name = userEntity.first_name ?? user.first_name;
        user.last_name = userEntity.last_name ?? user.last_name;
        user.phone = userEntity.phone ?? user.phone;
        user.is_active = userEntity.is_active ?? user.is_active;
        await user.save();

        if (userEntity.roles) {
            const roleIds = userEntity.roles.map(role => role.id);
            const roles = await RoleModel.findAll({
                where: { id: roleIds }
            });
            if (roles.length !== roleIds.length) {
                throw new Error(`Algunos roles no existen en la base de datos: ${roleIds}`);
            }
            await user.setRoles(roles);
        }

        const userWithRoles = await UserModel.findByPk(user.id, {
            include: [{ model: RoleModel, as: 'roles' }]
        });
        return this.#toEntity(userWithRoles);
    }

    async delete(id) {
        const user = await UserModel.findByPk(id, {
            include: [{ model: RoleModel, as: 'roles' }]
        });
        if (!user) return null;

        const userEntity = this.#toEntity(user);
        await user.destroy();
        return userEntity;
    }
}