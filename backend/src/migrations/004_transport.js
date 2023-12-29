const { DataTypes } = require('sequelize')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('transports', {
            id: {
                type: DataTypes.UUID,
                default: DataTypes.UUIDV4,
                primaryKey: true,
            },
            shipping_order_id: {
                allowNull: false,
                type: DataTypes.UUID,
            },
            receiving_branch_id: {
                allowNull: false,
                type: DataTypes.UUID,
            },
            receiving_time: {
                allowNull: true,
                type: DataTypes.DATE,
            },
            export_branch_id: {
                allowNull: false,
                type: DataTypes.UUID,
            },
            export_time: {
                allowNull: false,
                type: DataTypes.DATE,
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
        return queryInterface.dropTable('transports');
    }
}