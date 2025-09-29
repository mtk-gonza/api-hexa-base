import { RoleType } from './../../../../../../utils/role_type.js';

export const ROLES = [
    {
        name: RoleType.ROOT,
        description: 'System Administrator and all permissions',
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        name: RoleType.ADMIN,
        description: 'System Administrator',
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        name: RoleType.EDITOR,
        description: 'User with editing permissions',
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        name: RoleType.USER,
        description: 'Basic User',
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        name: RoleType.GUEST,
        description: 'Guest User',
        created_at: new Date(),
        updated_at: new Date()
    }
];