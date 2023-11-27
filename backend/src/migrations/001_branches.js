const {DataTypes} = require('sequelize')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('branches', {
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
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('branches');
    }
}