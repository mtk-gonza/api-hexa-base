import { ZodError } from 'zod'
import { UserUseCases } from './../../../application/use_cases/user_use_cases.js';
import { UserRepositoryImpl } from './../../repositories/user_repository_impl.js';
import { UserCreateSchema, UserUpdateSchema, UserResponseSchema, UserDeleteResponseSchema } from './../schemas/user_schema.js';

const userRepository = new UserRepositoryImpl();
const userUseCases = new UserUseCases(userRepository);

export const createUser = async (req, res) => {
    try {
        const data = UserCreateSchema.parse(req.body);
        const user = await userUseCases.createUser(data);
        const response = UserResponseSchema.parse(user);
        return res.status(201).json({
            success: true,
            data: response
        });

    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                success: false,
                detail: 'Validation error',
                issues: err.errors
            });
        }

        return res.status(500).json({
            success: false,
            detail: err.message || 'Unexpected error'
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await userUseCases.listUsers();
        const response = users.map((u) => UserResponseSchema.parse(u));
        return res.status(200).json({
            success: true,
            data: response
        });
    } catch (err) {
        return res.status(404).json({
            success: false,
            detail: err.message
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await userUseCases.getUserById(+req.params.id);
        const response = UserResponseSchema.parse(user);
        return res.status(200).json({
            success: true,
            data: response
        });
    } catch (err) {
        return res.status(404).json({
            success: false,
            detail: err.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const data = UserUpdateSchema.parse(req.body);
        const user = await userUseCases.updateUser(+req.params.id, data);
        const response = UserResponseSchema.parse(user);
        return res.status(200).json({
            success: true,
            data: response
        });
    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                success: false,
                detail: 'Validation error',
                issues: err.errors
            });
        }
        return res.status(500).json({
            success: false,
            detail: err.message || 'Unexpected error'
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await userUseCases.deleteUser(+req.params.id);

        const response = UserDeleteResponseSchema.parse({
            success: true,
            detail: 'User deleted successfully'
        });

        return res.status(200).json(response);

    } catch (err) {
        const response = UserDeleteResponseSchema.safeParse({
            success: false,
            detail: err.message
        });

        if (!response.success) {
            return res.status(500).json({
                success: false,
                detail: 'Internal response validation error',
                issues: response.error.errors
            });
        }

        return res.status(404).json(response.data);
    }
};