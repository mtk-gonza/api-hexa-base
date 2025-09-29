export const ROLE_COLUMNS = {
    id: {
        type: 'INTEGER',
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: 'STRING(60)',
        unique: true,
        allowNull: false
    },
    description: {
        type: 'STRING(255)',
        allowNull: true
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