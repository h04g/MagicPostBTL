module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('branches', [{
            id: '1',
            role: 3,
            address: 'Cầu Giấy, Hà Nội',
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: '2',
            role: 2,
            address: 'Hoàng Mai, Hà Nội',
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: '3',
            role: 2,
            address: 'Đống Đa, Hà Nội',
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: '4',
            role: 2,
            address: 'Thanh Xuân, Hà Nội',
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: '5',
            role: 2,
            address: 'Ba Đình, Hà Nội',
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: '6',
            role: 2,
            address: 'Hoàn Kiếm, Hà Nội',
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: '7',
            role: 1,
            address: 'Hoàng Mai, Hà Nội',
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: '8',
            role: 1,
            address: 'Đống Đa, Hà Nội',
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: '9',
            role: 1,
            address: 'Thanh Xuân, Hà Nội',
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: '10',
            role: 1,
            address: 'Ba Đình, Hà Nội',
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: '11',
            role: 1,
            address: 'Hoàn Kiếm, Hà Nội',
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: '12',
            role: 0,
            address: 'khách hàng',
            is_unused: false,
            created_at: new Date(),
            updated_at: new Date()
        }]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('branches', null, {});
    }
};