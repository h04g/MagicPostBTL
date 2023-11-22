const { DataTypes } = require('sequelize')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('shipping_orders', {
            id: {
                type: DataTypes.UUID,
                default: DataTypes.UUIDV4,
                primaryKey: true,
            },
            receiving_staff_id: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            sender_name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            sender_address: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            sender_phone_number: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            sender_postal_id: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            receiver_name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            receiver_address: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            receiver_phone_number: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            receiver_postal_id: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            product_type: {
                allowNull: false,
                type: DataTypes.INTEGER(4),
            },
            exceptional_service: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            iwgcnba: {
                allowNull: true,
                type: DataTypes.INTEGER(4),
            },
            weigh: {
                allowNull: false,
                type: DataTypes.FLOAT,
            },
            convert_weigh: {
                allowNull: false,
                type: DataTypes.FLOAT,
            },
            node: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            status: {
                allowNull: false,
                type: DataTypes.INTEGER(4),
            },
            delivery_time: {
                allowNull: true,
                type: DataTypes.DATE,
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
        return queryInterface.dropTable('shipping_orders');
    }
}