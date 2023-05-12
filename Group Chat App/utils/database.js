const Sequelize = require("sequelize");

const sequelize = new Sequelize("groupchat", "root", "Peeyush#5979", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
