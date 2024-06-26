'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/db')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    console.log(path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Branch = require('./branch')(sequelize, Sequelize.DataTypes);
db.Transport = require('./transport')(sequelize, Sequelize.DataTypes);
db.ShippingOrders =  require('./shippingOrders')(sequelize, Sequelize.DataTypes);

/**
 * Add associations below this comment
 * 
 * Example:
 * 
 * db.table_A.hasMany(db.table_B, {
 *    foreignKey: 'id_A'
 *  });
 *  db.table_B.belongsTo(db.table_A);
 */

db.Branch.hasMany(db.User, {
  foreignKey: 'branch_id',
})

db.Branch.hasMany(db.ShippingOrders, {
  foreignKey: "sender_postal_id",
});

db.Branch.hasMany(db.Transport, {
  foreignKey: "receiving_branch_id",
});

db.Branch.hasMany(db.Transport, {
  foreignKey: "export_branch_id",
});

db.ShippingOrders.hasMany(db.Transport, {
  foreignKey: "shipping_order_id",
});

db.User.hasMany(db.ShippingOrders, {
  foreignKey: "staff_id",
});


const connectDatabase = () => {
  sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error));
}

module.exports = {
  db,
  connectDatabase,
};