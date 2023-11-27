const {DataTypes} = require('sequelize')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: DataTypes.UUID,
                default: DataTypes.UUIDV4,
                primaryKey: true,
            },
            username: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING(255),
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING(255),
            },
            email: {
                allowNull: true,
                unique: true,
                type: DataTypes.STRING(255),
            },
            name: {
                allowNull: true,
                type: DataTypes.STRING(255),
            },
            phone: {
                allowNull: false,
                type: DataTypes.STRING(11),
            },
            role: {
                type: DataTypes.TINYINT,
                default: 0,
            },

            branch: {
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

            created_at: {
                type: DataTypes.DATE,
                default: DataTypes.NOW()
            },

            updated_at: {
                type: DataTypes.DATE,
                default: DataTypes.NOW()
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
}