'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const { USER_ROLES_COLUMNS } = await import('../../columns/user_roles_columns.js');
        const { mapperColumns } = await import('./../../../../../utils/mapper_columns.js');

        const mappedColumns = mapperColumns(USER_ROLES_COLUMNS, { forMigration: true });

        await queryInterface.createTable('user_roles', mappedColumns);
    },
    
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user_roles');
    }
};