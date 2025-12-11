import { UserRepositoryPort } from './../../application/ports/user_repository_port.js';
import { UserModel } from './../db/sequelize/models/user_model.js';
import { User } from './../../domain/models/user.js';
import { RoleModel } from './../db/sequelize/models/role_model.js';

export class UserRepositoryImpl extends UserRepositoryPort {
    constructor() {
        super();
    }
    #toEntity(userInstance) {
        return new User({
            id: userInstance.id,
            email: userInstance.email,
            password: userInstance.password,
            first_name: userInstance.first_name,
            last_name: userInstance.last_name,
            is_active: userInstance.is_active,
            roles: userInstance.roles?.map(role => ({
                id: role.id,
                name: role.name,
                permission: role.permission,
                description: role.description,  
                created_at: role.created_at,
                updated_at: role.updated_at
            })) || [],
            created_at: userInstance.created_at,
            updated_at: userInstance.updated_at
        })
    }
    async findAll({ withPassword = false } = {}) {
        const options = {
            include: [{ model: RoleModel, as: 'roles' }]
        };
        if (!withPassword) options.attributes = { exclude: ['password'] };
        const users = await UserModel.findAll(options);
        return users.map(user => this.#toEntity(user));
    }

    async findById(id, { withPassword = false } = {}) {
        const options = {
            include: [{ model: RoleModel, as: 'roles' }]
        };
        if (!withPassword) options.attributes = { exclude: ['password'] };
        const user = await UserModel.findByPk(id, options);
        return user ? this.#toEntity(user) : null;
    }

    async findByEmail(email, { withPassword = false } = {}) {
        const options = {
            where: { email },
            include: [{ model: RoleModel, as: 'roles' }]
        };

        if (!withPassword) {
            options.attributes = { exclude: ['password'] };
        }

        const user = await UserModel.findOne(options);
        return user ? this.#toEntity(user) : null;
    }

    async create(userEntity) {
        const user = await UserModel.create({
            email: userEntity.email,
            password: userEntity.password,
            first_name: userEntity.first_name,
            last_name: userEntity.last_name,
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

        user.email = userEntity.email ?? user.email;
        user.password = userEntity.password ?? user.password;
        user.first_name = userEntity.first_name ?? user.first_name;
        user.last_name = userEntity.last_name ?? user.last_name;
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