import { RoleType } from './../../../../../../utils/role_type.js';

export const USERS = [
    {
        username: 'root',
        email: 'root@example.com',
        password: 'root',
        first_name: 'root',
        last_name: 'root',
        phone: '91961',
        roles: [RoleType.ROOT, RoleType.ADMIN, RoleType.EDITOR],
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin',
        first_name: 'admin',
        last_name: 'admin',
        phone: '91961',
        roles: [RoleType.ADMIN, RoleType.EDITOR],
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        username: 'editor',
        email: 'editor@example.com',
        password: 'editor',
        first_name: 'editor',
        last_name: 'editor',
        phone: '91961',
        roles: [RoleType.EDITOR],
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        username: 'user',
        email: 'user@example.com',
        password: 'user',
        first_name: 'user',
        last_name: 'user',
        phone: '91961',
        roles: [RoleType.USER],
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        username: 'guest',
        email: 'guest@example.com',
        password: 'guest',
        first_name: 'guest',
        last_name: 'guest',
        phone: '91961',
        roles: [RoleType.GUEST],
        created_at: new Date(),
        updated_at: new Date()
    }
];