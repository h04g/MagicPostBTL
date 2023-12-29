module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [{
            id: '1',
            username: 'admin',
            password: '$2y$10$AncCizDde4y/7.GgzhFI3uk8bab9fdfEW74chTd1YgnMYf.x3tTYG',
            name: 'admin',
            role: 5,
            branch_id: 1,
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: '2',
            username: 'truong2',
            password: '$2y$10$AncCizDde4y/7.GgzhFI3uk8bab9fdfEW74chTd1YgnMYf.x3tTYG',
            name: 'truong2',
            role: 3,
            branch_id: 2,
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: '3',
            username: 'nhanvien2',
            password: '$2y$10$AncCizDde4y/7.GgzhFI3uk8bab9fdfEW74chTd1YgnMYf.x3tTYG',
            name: 'nhanvien2',
            role: 4,
            branch_id: 2,
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: '4',
            username: 'truong7',
            password: '$2y$10$AncCizDde4y/7.GgzhFI3uk8bab9fdfEW74chTd1YgnMYf.x3tTYG',
            name: 'admin',
            role: 1,
            branch_id: 7,
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: '5',
            username: 'nhanvien7',
            password: '$2y$10$AncCizDde4y/7.GgzhFI3uk8bab9fdfEW74chTd1YgnMYf.x3tTYG',
            name: 'admin',
            role: 2,
            branch_id: 7,
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        }]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};