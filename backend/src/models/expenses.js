const { hash } = require('../utils/bcrypt');

const ExpensesModel = (sequelize, DataTypes) => {
    const Expenses = sequelize.define('expenses', {
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        shipping_order_id: {
            field: 'shipping_order_id',
            type: DataTypes.INTEGER(11),
            unique: true,
        },
        main_charge: {
            field: 'main_charge',
            type: DataTypes.INTEGER(11),
        },
        surcharge: {
            field: 'surcharge',
            type: DataTypes.INTEGER(11),
        },
        vat_fee: {
            field: 'vat_fee:',
            type: DataTypes.INTEGER(11),
        },
        total_fare: {
            field: 'total_fare',
            type: DataTypes.INTEGER(11),
        },
        other_revenue: {
            field: 'other_revenue',
            type: DataTypes.INTEGER(11),
        },
        total_revenue: {
            field: 'total_revenue',
            type: DataTypes.INTEGER(11),
        }
    }, {
        timestamp: true,
    }
    );

    return Expenses;
}

module.exports = ExpensesModel;
