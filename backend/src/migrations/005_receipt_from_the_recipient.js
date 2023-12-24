const { DataTypes } = require('sequelize')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('receipt_from_the_recipient', {
            id: {
                type: DataTypes.UUID,
                default: DataTypes.UUIDV4,
                primaryKey: true,
            },
            shipping_order_id: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            cod: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            other_revenue: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            total_revenue: {
                allowNull: true,
                type: DataTypes.INTEGER(11),
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
        return queryInterface.dropTable('receipt_from_the_recipient');
    }
}
