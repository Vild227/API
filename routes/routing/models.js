const Sequelize = require('sequelize');
const config = {
    dialect: 'mysql',
    host: '130.225.170.71',
    username: 'root1',
    password: 'root1Root1&',
    database: 'WebPage',
    port: 3306,
};

const sequelize = new Sequelize(config);

const User = sequelize.define('User', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
});

module.exports = { sequelize, User };