const {DataTypes} = require('sequelize')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('expenses', {
            id: {
                type: DataTypes.UUID,
                default: DataTypes.UUIDV4,
                primaryKey: true,
            },
            order_id: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            main_charge: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            surcharge: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            vat_fee: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            total_fare: {
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
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('expenses');
    }
}