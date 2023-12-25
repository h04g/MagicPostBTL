const BranchModel = (sequelize, DataTypes) => {
    const Branch = sequelize.define('branches', {
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
        is_unused: {
            field: 'is_unused',
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
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
    });

    return Branch;
}

module.exports = BranchModel;
