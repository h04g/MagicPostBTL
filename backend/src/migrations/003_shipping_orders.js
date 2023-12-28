const { DataTypes } = require('sequelize')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('shipping_orders', {
            id: {
                type: DataTypes.UUID,
                default: DataTypes.UUIDV4,
                primaryKey: true,
            },
            staff_id: {
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
                type: DataTypes.STRING,
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
                type: DataTypes.STRING,
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
            main_charge: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            surcharge: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            expenses_gygt: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            vat_fee: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            other_revenue: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            total_fare: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            cod: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            receiver_other_revenue: {
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
        return queryInterface.dropTable('shipping_orders');
    }
}