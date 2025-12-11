import { z } from 'zod';
import { RoleResponseSchema } from './role_schema.js';

export const UserBaseSchema = z.object({
    email: z.string({
        required_error: 'Email is required.',
        invalid_type_error: 'Email must be a text string.'
    })
        .min(1, 'Email cannot be empty.')
        .email('Please provide a valid email address.'),

    first_name: z.string({
        required_error: 'Name is required.',
        invalid_type_error: 'Name must be a text string.'
    })
        .min(3, 'El nombre no puede estar vacío y debe tener al menos 3 caracteres')
        .max(100, 'El nombre es demasiado largo'),

    last_name: z.string({
        required_error: 'Last name is required.',
        invalid_type_error: 'El apellido debe ser una cadena de texto'
    })
        .min(3, 'El apellido no puede estar vacío y debe tener al menos 3 caracteres')
        .max(100, 'El apellido es demasiado largo'),

    is_active: z.boolean().default(true)
});

export const UserCreateSchema = UserBaseSchema.extend({
    password: z.string({
        required_error: 'Password is required.',
        invalid_type_error: 'Password must be a text string'
    })
        .min(6, 'Password cannot be empty and must be at least 6 characters long.')
        .max(100, 'Password is too long.')
});

export const UserUpdateSchema = UserCreateSchema.partial();

export const UserResponseSchema = UserBaseSchema.extend({
    id: z.number(),
    roles: z.array(RoleResponseSchema).nullable().default([]),
    created_at: z.union([z.string(), z.date()]),
    updated_at: z.union([z.string(), z.date()])
});

export const UserDeleteResponseSchema = z.object({
    success: z.boolean(),
    detail: z.string()
});