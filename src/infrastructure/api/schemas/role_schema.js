import { z } from 'zod';

const RoleBaseSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
});

export const RoleCreateSchema = RoleBaseSchema;

export const RoleUpdateSchema = RoleBaseSchema;

export const RoleResponseSchema = RoleBaseSchema.extend({
    id: z.number(),
    created_at: z.union([z.string(), z.date()]),
    updated_at: z.union([z.string(), z.date()])
});

export const RoleDeleteResponseSchema = z.object({
    success: z.boolean(),
    detail: z.string(),
});