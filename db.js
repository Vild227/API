//var mysql = require('mysql');
// const Sequelize = require('sequelize');
//
// config = {
//     host: '130.225.170.71',
//     user: 'root1',
//     password: 'root1Root1&',
//     database: 'WebPage',
//     port: 3306
// }
//
// var connection =mysql.createConnection(config); //added the line
// connection.connect(function(err){
//     if (err){
//         console.log('error connecting:' + err.stack);
//     }
//     console.log('connected successfully to DB.');
// });
//
// module.exports ={
//     connection : mysql.createConnection(config)
// }

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

sequelize.authenticate()
    .then(() => {
        console.log('Connected successfully to DB.');
    })
    .catch((err) => {
        console.log('Error connecting: ' + err.stack);
    });

module.exports = {
    sequelize: sequelize,
};



/*
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '130.225.170.71',
    user: 'root1',
    password: 'root1Root1&',
    database: 'WebPage',
    port: 3306
});

connection.connect(function(err) {
    if (err) throw err;
    connection.query("SELECT * FROM Product", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});

module.exports = connection;

 */