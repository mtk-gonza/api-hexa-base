import { ZodError } from 'zod'
import { RoleRepositoryImpl } from '../../repositories/role_repository_impl.js';
import { RoleUseCases } from '../../../application/use_cases/role_use_cases.js';
import { RoleCreateSchema, RoleUpdateSchema, RoleResponseSchema, RoleDeleteResponseSchema } from './../schemas/role_schema.js';

const roleRepository = new RoleRepositoryImpl();
const roleUseCases = new RoleUseCases(roleRepository);

export const createRole = async (req, res) => {
    try {
        const data = RoleCreateSchema.parse(req.body);
        const role = await roleUseCases.createRole(data);
        const response = RoleResponseSchema.parse(role);
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

export const getRoles = async (req, res) => {
    try {
        const roles = await roleUseCases.listRoles();
        const response = roles.map((r) => RoleResponseSchema.parse(r));
        return res.status(200).json({
            success: true,
            data: roles
        });
    } catch (err) {
        return res.status(404).json({
            success: false,
            detail: err.message
        });
    }
};

export const getRoleById = async (req, res) => {
    try {
        const role = await roleUseCases.getRoleById(+req.params.id);
        const response = RoleResponseSchema.parse(role);
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

export const updateRole = async (req, res) => {
    try {
        const data = RoleUpdateSchema.parse(req.body);
        const role = await roleUseCases.updateRole(+req.params.id, data);
        const response = RoleResponseSchema.parse(role);
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

export const deleteRole = async (req, res) => {
    try {
        await roleUseCases.deleteRole(+req.params.id);

        const response = RoleDeleteResponseSchema.parse({
            success: true,
            detail: 'Role deleted successfully'
        });

        return res.status(200).json(response);

    } catch (err) {
        const response = RoleDeleteResponseSchema.safeParse({
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