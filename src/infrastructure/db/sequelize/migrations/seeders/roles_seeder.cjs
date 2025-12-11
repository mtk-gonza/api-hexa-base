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
                const roleToInsert = {
                    ...role,
                    permission: JSON.stringify(role.permission)
                };
                await queryInterface.bulkInsert('roles', [roleToInsert], {});
            }
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('roles', null, {});
    }
};