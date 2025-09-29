import { z } from 'zod';

export const TokenSchema = z.object({
    access_token: z.string(),
    token_type: z.string()
});

export const TokenData = z.object({
    id: z.number(),
    username: z.string(),
    roles: z.array(z.string())
});

export const registerSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    first_name: z.string().optional(),
    last_name: z.string().optional()
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});