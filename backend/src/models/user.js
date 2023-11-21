const { hash } = require('../utils/bcrypt');

const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            field: 'username',
            type: DataTypes.STRING,
        },
        password: {
            field: 'password',
            type: DataTypes.STRING,
        },
        email: {
            field: 'email',
            type: DataTypes.STRING,
            unique: true
        },
        name: {
            field: 'name',
            type: DataTypes.STRING,
        },
        phone_number: {
            field: 'phone_number',
            type: DataTypes.INTEGER(11),
            unique: true
        },
        role: {
            field: 'role',
            type: DataTypes.INTEGER(4),
            defaultValue: 1,
        },
        branch_id: {
            field: 'branch_id',
            type: DataTypes.INTEGER(11),
        },
    }, {
        timestamp: true,
    }
    );

    User.beforeCreate(async (user, options) => {
        const hashedPassword = hash(user.password);
        user.password = hashedPassword;
    })

    return User;
}

module.exports = UserModel;
