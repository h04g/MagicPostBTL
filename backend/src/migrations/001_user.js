const {DataTypes} = require('sequelize')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                type: DataTypes.UUID,
                default: DataTypes.UUIDV4,
                primaryKey: true,
            },
            
            email: {
                type: DataTypes.STRING,
                allowNum: false,
            },
            
            name: {
                type: DataTypes.STRING,
                allowNum: false,
            },

            password: {
                type: DataTypes.STRING,
                allowNum: false,
            },

            createdAt: {
                type: DataTypes.DATE,
                default: DataTypes.NOW()
            },
            updatedAt: {
                type: DataTypes.DATE,
                default: DataTypes.NOW()
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
}