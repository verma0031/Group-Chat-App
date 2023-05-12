const Sequelize = require("sequelize");

const db = require("../utils/database");

module.exports = db.define("groupMembers", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  group_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
  is_admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});
