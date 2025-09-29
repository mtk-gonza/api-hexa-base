export const USER_ROLES_COLUMNS = {
    user_id: {
        type: 'INTEGER',
        primaryKey: true,
    },
    role_id: {
        type: 'INTEGER',
        primaryKey: true,
    },
    created_at: {
        type: 'DATE',
        allowNull: false,
        defaultValue: 'CURRENT_TIMESTAMP'
    },
    updated_at: {
        type: 'DATE',
        allowNull: false,
        defaultValue: 'CURRENT_TIMESTAMP'
    }    
};