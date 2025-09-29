export const USER_COLUMNS = {
    id: {
        type: 'INTEGER',
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: 'STRING(20)',
        allowNull: false,
        unique: true
    },
    email: {
        type: 'STRING(50)',
        allowNull: false,
        unique: true
    },
    password: {
        type: 'STRING(100)',
        allowNull: false
    },
    first_name: {
        type: 'STRING(60)',
        allowNull: false
    },
    last_name: {
        type: 'STRING(60)',
        allowNull: false
    },
    phone: {
        type: 'STRING(50)',
        allowNull: true
    },
    is_active: {
        type: 'BOOLEAN',
        defaultValue: true
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