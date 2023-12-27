const {DataTypes} = require('sequelize')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('branches', {
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
            is_unused: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                default: false
            },
            created_at: {
                type: DataTypes.DATE,
                default: DataTypes.NOW()
            },
            updated_at: {
                type: DataTypes.DATE,
                default: DataTypes.NOW()
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('branch');
    }
}