'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const { USER_COLUMNS } = await import('../../columns/user_columns.js');
        const { mapperColumns } = await import('./../../../../../utils/mapper_columns.js');

        const mappedColumns = mapperColumns(USER_COLUMNS, { forMigration: true });

        await queryInterface.createTable('users', mappedColumns);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
};