module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            id: '88168ad2-d727-4650-95db-1d9d27340649',
            email: 'ditme@gmail.com',
            name: 'ditment',
            password: 'asldkjqowie1231239aslkdjas',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};