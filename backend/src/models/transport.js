const TransportModel = (sequelize, DataTypes) => {
    const Transport = sequelize.define('transports', {
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        shipping_order_id: {
            field: 'shipping_order_id',
            type: DataTypes.UUID,
        },
        receiving_branch_id: {
            field: 'receiving_branch_id',
            type: DataTypes.UUID,
        },
        receiving_time: {
            field: 'receiving_time',
            type: DataTypes.DATE,
        },
        export_branch_id: {
            field: 'export_branch_id',
            type: DataTypes.UUID,
        },
        export_time: {
            field: 'export_time',
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

    return Transport;
}

module.exports = TransportModel;
