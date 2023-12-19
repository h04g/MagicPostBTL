const { hash } = require('../utils/bcrypt');

const BranchModel = (sequelize, DataTypes) => {
    const Branch = sequelize.define('branch', {
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        role: {
            field: 'role',
            type: DataTypes.INTEGER(4),
        },
        address: {
            field: 'address',
            allowNull: false,
            type: DataTypes.STRING(1000),
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

    return Branch;
}

module.exports = BranchModel;
