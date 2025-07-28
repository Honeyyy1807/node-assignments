
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('authdb', 'honeybhandari', 'mypassword', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
