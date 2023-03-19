/*this file is basically product.js and app.js in one because i couldn't get it working
*/

const express = require('express')
const config = require('../db.js');
const connection = config.connection;
const app = express();
const PORT = 8080;




app.listen(
    PORT,
    () =>
    console.log(`its alive on http://localhost:${PORT}`)

)

app.get('/product', (req, res) => {
    connection.query('SELECT * FROM Product', (error, results, fields) => {
        if (error) {
            res.status(500).send('Error retrieving products from database');
        } else {
            res.status(200).send(results);
        }
    });
});



