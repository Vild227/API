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

const PasswordResetToken = sequelize.define('password_reset_token', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});


User.hasOne(PasswordResetToken, { foreignKey: 'userId' });
PasswordResetToken.belongsTo(User, { foreignKey: 'userId' });

module.exports = { PasswordResetToken };