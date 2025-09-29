import { z } from 'zod';
import { RoleResponseSchema } from './role_schema.js';

export const UserBaseSchema = z.object({
    username: z.string(),
    email: z.string(),
    first_name: z.string().optional().nullable(),
    last_name: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    is_active: z.boolean().default(true),
});

export const UserCreateSchema = UserBaseSchema.extend({
    password: z.string().min(6),
});

export const UserUpdateSchema = z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    first_name: z.string().optional().nullable(),
    last_name: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    is_active: z.boolean().optional(),
});

export const UserResponseSchema = UserBaseSchema.extend({
    id: z.number(),
    roles: z.array(RoleResponseSchema).nullable().default([]),
    created_at: z.union([z.string(), z.date()]),
    updated_at: z.union([z.string(), z.date()]),
});

export const UserDeleteResponseSchema = z.object({
    success: z.boolean(),
    detail: z.string(),
});