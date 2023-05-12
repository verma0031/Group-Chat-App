const Sequelize = require("sequelize");

const db = require("../utils/database");

module.exports = db.define("user", {
  user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: Sequelize.STRING, unique: true },
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  password: Sequelize.STRING,
});
