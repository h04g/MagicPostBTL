const { hash } = require('../utils/bcrypt');

const ReceiptFromTheRecipientModel = (sequelize, DataTypes) => {
    const ReceiptFromTheRecipient = sequelize.define('receipt_from_the_recipient', {
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
        cod: {
            field: 'cod',
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

    return ReceiptFromTheRecipient;
}

module.exports = ReceiptFromTheRecipientModel;
