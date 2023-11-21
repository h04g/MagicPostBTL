const { hash } = require('../utils/bcrypt');

const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
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
        
        password: {
            field: 'password',
            type: DataTypes.STRING,
        }
    
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
