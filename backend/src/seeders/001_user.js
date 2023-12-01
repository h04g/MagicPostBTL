module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [{
            id: '88168ad2-d727-4650-95db-1d9d27340649',
            username: 'admin_username',
            password: '$2a$12$0ZI2Aqm8TWriWOiZ5LiXN.oK4t1qurD/uC29B8lt00ZRYblng7cTu', // = admin
            email: 'admin@gmail.com',
            name: 'admin',
            phone: '12345678900',
            role: 0,
            branch: null,
            created_at: new Date(),
            updated_at: new Date()
        }]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};