const { DataTypes } = require('sequelize')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('transports', {
            id: {
                type: DataTypes.UUID,
                default: DataTypes.UUIDV4,
                primaryKey: true,
            },
            order: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: {
                        tableName: 'orders',
                    },
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },

            receiving_branch_id: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: {
                        tableName: 'branches',
                    },
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },

            receiving_time: {
                allowNull: false,
                type: DataTypes.DATE,
                default: DataTypes.NOW(),
            },
            export_branch_id: {
                allowNull: false,
                type: DataTypes.UUID,
                references: {
                    model: {
                        tableName: 'branches',
                    },
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            export_time: {
                allowNull: true,
                type: DataTypes.DATE,
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('transports');
    }
}