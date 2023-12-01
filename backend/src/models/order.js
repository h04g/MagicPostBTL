const ShippingOrdersModel = (sequelize, DataTypes) => {
    const ShippingOrders = sequelize.define('shipping_orders', {
        id: {
            type: DataTypes.UUID,
            default: DataTypes.UUIDV4,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        sender_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        sender_address: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        sender_phone: {
            allowNull: false,
            type: DataTypes.STRING(11),
        },

        receiver_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        receiver_address: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        receiver_phone: {
            allowNull: false,
            type: DataTypes.INTEGER(11),
        },


        departure: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: {
                    tableName: 'branches',
                },
                key: 'id'
            },
            allowNull: true,
            onDelete: 'CASCADE',
        },

        destination: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: {
                    tableName: 'branches',
                },
                key: 'id'
            },
            allowNull: true,
            onDelete: 'CASCADE',
        },

        product_type: {
            allowNull: false,
            type: DataTypes.TINYINT,
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
            default: 0,
        },
        convert_weigh: {
            allowNull: false,
            type: DataTypes.FLOAT,
            default: 0,
        },
        node: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        status: {
            allowNull: false,
            type: DataTypes.TINYINT,
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
        },

        // expenses
        main_fare: {
            type: DataTypes.FLOAT,
            default: 0,
        },
        extra_fare: {
            type: DataTypes.FLOAT,
            default: 0,
        },
        gtgt_fare: {
            type: DataTypes.FLOAT,
            default: 0,
        },
        vat_fee: {
            type: DataTypes.FLOAT,
            default: 0,
        },
        other_fare: {
            type: DataTypes.FLOAT,
            default: 0,
        },
        total_fare: {
            type: DataTypes.FLOAT,
            default: 0,
        },

        // receipt_from_the_recipient
        cod_receiver: {
            type: DataTypes.FLOAT,
            default: 0,
        },
        other_fee_receiver: {
            type: DataTypes.FLOAT,
            default: 0,
        },
        total_fee_receiver: {
            type: DataTypes.FLOAT,
            default: 0,
        },
    }, {
        timestamps: false,
    });

    return ShippingOrders;
}

module.exports = ShippingOrdersModel;
