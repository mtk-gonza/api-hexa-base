import { Role } from './../../domain/models/role.js';

export class RoleUseCases {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }

    async listRoles() {
        return await this.roleRepository.findAll();
    }

    async getRoleById(id) {
        const role = await this.roleRepository.findById(id);
        if (!role) throw new Error('Role not found');
        return role;
    }

    async createRole(data) {
        if (!data.name) throw new Error('Name is required');

        const roleEntity = new Role({
            name: data.name,
            permission: data.permission,
            description: data.description
        });

        return await this.roleRepository.create(roleEntity);
    }

    async updateRole(id, data) {
        const roleEntity = new Role({
            name: data.name,
            permission: data.permission,
            description: data.description
        });

        const updated = await this.roleRepository.update(id, roleEntity);
        if (!updated) throw new Error('Role not found');
        return updated;
    }

    async deleteRole(id) {
        const deleted = await this.roleRepository.delete(id);
        if (!deleted) throw new Error('Role not found');
        return deleted;
    }
}