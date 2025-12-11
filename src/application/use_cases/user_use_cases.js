import { User } from './../../domain/models/user.js';

export class UserUseCases {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async listUsers() {
        return await this.userRepository.findAll();
    }

    async getUserById(id) {
        const user = await this.userRepository.findById(id);
        if (!user) throw new Error('User not found');
        return user;
    }

    async createUser(data) {
        if (!data.email) throw new Error('Email is required');
        if (!data.password) throw new Error('Password is required');
        if (!data.first_name) throw new Error('First Name is required');
        if (!data.last_name) throw new Error('Last Name is required');

        const userEntity = new User({
            email: data.email,
            password: data.password,
            first_name: data.first_name,
            last_name: data.last_name,
            is_active: data.is_active
        });

        return await this.userRepository.create(userEntity);
    }

    async updateUser(id, data) {
        const userEntity = new User({
            email: data.email,
            password: data.password,
            first_name: data.first_name,
            last_name: data.last_name,
            is_active: data.is_active
        });

        const updated = await this.userRepository.update(id, userEntity);
        if (!updated) throw new Error('User not found');
        return updated;
    }

    async deleteUser(id) {
        const deleted = await this.userRepository.delete(id);
        if (!deleted) throw new Error('User not found');
        return deleted;
    }
}