const Sequelize = require("sequelize");

const db = require("../utils/database");

module.exports = db.define("chat", {
  chat_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  sender_id: Sequelize.INTEGER,
  group_id: Sequelize.INTEGER,
  message: Sequelize.STRING,
});
