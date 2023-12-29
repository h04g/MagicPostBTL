const ShippingOrdersModel = (sequelize, DataTypes) => {
    const ShippingOrders = sequelize.define('shipping_orders', {
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        staff_id: {
            field: 'staff_id',
            type: DataTypes.UUID,
        },
        sender_name: {
            field: 'sender_name',
            type: DataTypes.STRING,
        },
        sender_address: {
            field: 'sender_address',
            type: DataTypes.STRING,
        },
        sender_phone_number: {
            field: 'sender_phone_number',
            type: DataTypes.STRING,
        },
        sender_postal_id: {
            field: 'sender_postal_id',
            type: DataTypes.UUID,
        },
        receiver_name: {
            field: 'receiver_name',
            type: DataTypes.STRING,
        },
        receiver_address: {
            field: 'receiver_address',
            type: DataTypes.STRING,
        },
        receiver_phone_number: {
            field: 'receiver_phone_number',
            type: DataTypes.STRING,
        },
        receiver_postal_id: {
            field: 'receiver_postal_id',
            type: DataTypes.INTEGER(11),
        },
        product_type: {
            field: 'product_type',
            type: DataTypes.INTEGER(4),
        },
        exceptional_service: {
            field: 'exceptional_service',
            type: DataTypes.STRING,
        },
        iwgcnba: {
            field: 'iwgcnba',
            type: DataTypes.INTEGER(4),
        },
        weigh: {
            field: 'weigh',
            type: DataTypes.FLOAT,
        },
        convert_weigh: {
            field: 'convert_weigh',
            type: DataTypes.FLOAT,
        },
        node: {
            field: 'node',
            type: DataTypes.STRING,
        },
        status: {
            field: 'status',
            type: DataTypes.INTEGER(4),
        },
        delivery_time: {
            field: 'delivery_time',
            type: DataTypes.DATE,
        },
        main_charge: {
            field: 'main_charge',
            type: DataTypes.INTEGER(11),
        },
        surcharge: {
            field: 'surcharge',
            type: DataTypes.INTEGER(11),
        },
        expenses_gygt: {
            field: 'expenses_gygt',
            type: DataTypes.INTEGER(11),
        },
        vat_fee: {
            field: 'vat_fee',
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
        cod: {
            field: 'cod',
            type: DataTypes.INTEGER(11),
        },
        receiver_other_revenue: {
            field: 'receiver_other_revenue',
            type: DataTypes.INTEGER(11),
        },
        total_revenue: {
            field: 'total_revenue',
            type: DataTypes.INTEGER(11),
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            default: DataTypes.NOW()
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            default: DataTypes.NOW()
        }
    }, {
        timestamp: true,
    }
    );

    return ShippingOrders;
}

module.exports = ShippingOrdersModel;
