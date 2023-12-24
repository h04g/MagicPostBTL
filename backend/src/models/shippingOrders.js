const ShippingOrdersModel = (sequelize, DataTypes) => {
    const ShippingOrders = sequelize.define('shipping_orders', {
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        receiving_staff_id: {
            field: 'receiving_staff_id',
            type: DataTypes.INTEGER(11),
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
            type: DataTypes.INTEGER(11),
        },
        sender_postal_id: {
            field: 'sender_postal_id',
            type: DataTypes.INTEGER(11),
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
            type: DataTypes.INTEGER(11),
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
            field: 'email',
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
