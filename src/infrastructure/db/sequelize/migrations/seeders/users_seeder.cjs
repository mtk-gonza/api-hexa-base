'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const { USERS } = await import('./data/users_data.js');
        const bcrypt = await import('bcrypt');

        const roles = await queryInterface.sequelize.query(`SELECT id, name FROM roles;`);
        const rolesMap = {};
        roles[0].forEach(r => {
            rolesMap[r.name] = r.id;
        });

        for (const user of USERS) {
            let userId = await queryInterface.rawSelect(
                'users',
                { where: { email: user.email } },
                ['id']
            );

            if (!userId) {
                user.password = bcrypt.hashSync(user.password, 10);

                await queryInterface.bulkInsert('users', [{
                    email: user.email,
                    password: user.password,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    is_active: true,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }], {});

                userId = await queryInterface.rawSelect(
                    'users',
                    { where: { email: user.email } },
                    ['id']
                );
            }

            const userRolesToInsert = user.roles.map(roleName => ({
                user_id: userId,
                role_id: rolesMap[roleName],
                created_at: new Date(),
                updated_at: new Date()
            }));

            await queryInterface.bulkInsert('user_roles', userRolesToInsert, {});
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('user_roles', null, {});
        await queryInterface.bulkDelete('users', null, {});
    }
};