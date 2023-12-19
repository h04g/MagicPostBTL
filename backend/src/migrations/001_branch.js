const {DataTypes} = require('sequelize')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('branch', {
            id: {
                type: DataTypes.UUID,
                default: DataTypes.UUIDV4,
                primaryKey: true,
            },
            role: {
                allowNull: false,
                type: DataTypes.INTEGER(4),
            },
            address: {
                allowNull: false,
                type: DataTypes.STRING(1000),
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
        return queryInterface.dropTable('branch');
    }
}