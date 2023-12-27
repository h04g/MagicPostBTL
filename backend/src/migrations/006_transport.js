const { DataTypes } = require('sequelize')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('transport', {
            id: {
                type: DataTypes.UUID,
                default: DataTypes.UUIDV4,
                primaryKey: true,
            },
            shipping_order_id: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            receiving_branch_id: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            receiving_time: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            export_branch_id: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            export_time: {
                allowNull: true,
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
        return queryInterface.dropTable('transport');
    }
}