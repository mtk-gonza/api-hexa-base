import { z } from 'zod';

const permissionEnum = z.enum(['create', 'read', 'update', 'delete']);

const RoleBaseSchema = z.object({
    name: z.string({
        required_error: 'El nombre es obligatorio',
        invalid_type_error: 'El nombre debe ser una cadena de texto'
    })
        .min(3, 'El nombre no puede estar vacío y debe tener al menos 3 caracteres')
        .max(100, 'El nombre es demasiado largo'),

    permission: z.array(permissionEnum)
        .min(1, 'Debe haber al menos un permiso')
        .max(4, 'No se permiten más de 4 permisos')
        .refine((perms) => new Set(perms).size === perms.length, {
            message: 'Los permisos no deben repetirse'
        }),

    description:z.string({
        required_error: 'La descripción es obligatoria'
    })
        .min(10, 'La descripción debe tener al menos 10 caracteres')
        .max(1000, 'La descripción es demasiado larga')
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