import { RoleType } from './../../../../../../utils/role_type.js';

const now = new Date();

export const USERS = [
    {
        email: 'root@example.com',
        password: 'root123',
        first_name: 'root',
        last_name: 'root',
        roles: [RoleType.ROOT, RoleType.ADMIN, RoleType.EDITOR],
        created_at: now,
        updated_at: now
    },
    {
        email: 'admin@example.com',
        password: 'admin123',
        first_name: 'admin',
        last_name: 'admin',
        roles: [RoleType.ADMIN, RoleType.EDITOR],
        created_at: now,
        updated_at: now
    },
    {
        email: 'editor@example.com',
        password: 'editor123',
        first_name: 'editor',
        last_name: 'editor',
        roles: [RoleType.EDITOR],
        created_at: now,
        updated_at: now
    },
    {
        email: 'user@example.com',
        password: 'user123',
        first_name: 'user',
        last_name: 'user',
        roles: [RoleType.USER],
        created_at: now,
        updated_at: now
    }
];