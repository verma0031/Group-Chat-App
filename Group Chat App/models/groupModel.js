const Sequelize = require("sequelize");

const db = require("../utils/database");

module.exports = db.define("group", {
  group_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  group_name: Sequelize.STRING,
});
