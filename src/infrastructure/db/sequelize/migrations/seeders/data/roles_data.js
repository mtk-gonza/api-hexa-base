import { RoleType } from './../../../../../../utils/role_type.js';
import { PermissionType } from './../../../../../../utils/permission_type.js';

const now = new Date();

export const ROLES = [
    {
        name: RoleType.ROOT,
        permission: [ 
            PermissionType.CREATE, 
            PermissionType.READ, 
            PermissionType.UPDATE,
            PermissionType.DELETE
        ],
        description: 'System Administrator and all permissions',
        created_at: now,
        updated_at: now
    },
    {
        name: RoleType.ADMIN,
        permission: [
            PermissionType.CREATE, 
            PermissionType.READ, 
            PermissionType.UPDATE
        ],
        description: 'System Administrator',
        created_at: now,
        updated_at: now
    },
    {
        name: RoleType.EDITOR,
        permission: [
            PermissionType.READ, 
            PermissionType.UPDATE
        ],       
        description: 'User with editing permissions',
        created_at: now,
        updated_at: now
    },
    {
        name: RoleType.USER,
        permission: [
            PermissionType.READ
        ],
        description: 'Basic User for read',
        created_at: now,
        updated_at: now
    }
];