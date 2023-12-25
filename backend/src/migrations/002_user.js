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
                type: DataTypes.STRING,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            email: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            name: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            phone_number: {
                allowNull: true,
                type: DataTypes.INTEGER(11),
            },
            role: {
                allowNull: false,
                type: DataTypes.INTEGER(4),
                defaultValue: 1,
            },
            branch_id: {
                allowNull: false,
                type: DataTypes.INTEGER(11),
            },
            is_unused: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                default: false
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