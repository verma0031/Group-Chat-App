const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('seller-products',{
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  product: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;