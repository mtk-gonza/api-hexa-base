'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const { ROLES } = await import('./data/roles_data.js');
        for (const role of ROLES ) {
            let roleId = await queryInterface.rawSelect(
                'roles',
                { where: { name: role.name} },
                ['id']
            );
            if (!roleId) {
                await queryInterface.bulkInsert('roles', [role], {});
            }
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('roles', null, {});
    }
};