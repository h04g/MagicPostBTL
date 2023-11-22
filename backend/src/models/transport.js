const { hash } = require('../utils/bcrypt');

const TransportModel = (sequelize, DataTypes) => {
    const Transport = sequelize.define('transport', {
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        shipping_order_id: {
            field: 'shipping_order_id',
            type: DataTypes.INTEGER(11),
        },
        receiving_branch_id: {
            field: 'receiving_branch_id',
            type: DataTypes.INTEGER(11),
        },
        receiving_time: {
            field: 'receiving_time',
            type: DataTypes.DATE,
        },
        export_branch_id: {
            field: 'export_branch_id',
            type: DataTypes.INTEGER(11),
        },
        export_time: {
            field: 'export_time',
            type: DataTypes.DATE,
        }
    }, {
        timestamp: true,
    }
    );

    return Transport;
}

module.exports = TransportModel;
