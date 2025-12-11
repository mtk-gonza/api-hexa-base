import { z } from 'zod';
import { UserCreateSchema } from './user_schema.js'

export const tokenSchema = z.object({
    access_token: z.string({
        required_error: 'Access token is required.',
        invalid_type_error: 'Access token must be a string.'
    })
        .min(1, 'Access token cannot be empty.')
        .max(5000, 'Access token is too long.'),

    token_type: z.string({
        required_error: 'Token type is required.',
        invalid_type_error: 'Token type must be a string.'
    })
        .toLowerCase()
        .refine(val => val === 'bearer', {
            message: 'Token type must be "Bearer".'
        })
});

export const tokenData = z.object({
    id: z.number().int().positive(),
    email: z.string().email(),
    roles: z.array(z.string()).min(1, 'User must have at least one role.')
});

export const registerSchema = UserCreateSchema.partial();

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required.',
        invalid_type_error: 'Email must be a text string.'
    })
        .min(1, 'Email cannot be empty.')
        .email('Please provide a valid email address.'),
    password: z.string({
        required_error: 'Password is required.',
        invalid_type_error: 'Password must be a text string'
    })
        .min(6, 'Password cannot be empty and must be at least 6 characters long.')
        .max(100, 'Password is too long.')
});