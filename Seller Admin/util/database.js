const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Peeyush#5979', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;