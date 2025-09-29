'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const { REFRESH_TOKEN_COLUMNS } = await import('../../columns/refresh_token_columns.js');
        const { mapperColumns } = await import('./../../../../../utils/mapper_columns.js');

        const mappedColumns = mapperColumns(REFRESH_TOKEN_COLUMNS, { forMigration: true });

        await queryInterface.createTable('refresh_tokens', mappedColumns);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('refresh_tokens');
    }
};
