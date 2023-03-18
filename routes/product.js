const express = require('express')
const router = express.Router();
const config = require('../db.js');
const connection = config.connection;


//router.use(express.json())


router.get('/product', (req, res) => {
    connection.query('SELECT * FROM Product', (error, results, fields) => {
        if (error) {
            res.status(500).send('Error retrieving products from database');
        } else {
            res.status(200).send(results);
        }
    });
});


module.exports = router;





