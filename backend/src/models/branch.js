const { hash } = require('../utils/bcrypt');

const BranchModel = (sequelize, DataTypes) => {
    const Branch = sequelize.define('branch', {
        id: {
            type: DataTypes.UUID,
            default: DataTypes.UUIDV4,
            primaryKey: true,
        },
        role: {
            type: DataTypes.TINYINT,
            allowNull: false,
            default: 1,
        },
        address: {
            allowNull: false,
            type: DataTypes.TEXT,
            default: '',
        },
        created_at: {
            type: DataTypes.DATE,
            default: DataTypes.NOW()
        },
        updated_at: {
            type: DataTypes.DATE,
            default: DataTypes.NOW()
        },

        consolidation_point: {
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
        }
    });

    return Branch;
}

module.exports = BranchModel;
