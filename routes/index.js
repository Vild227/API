

/*
var express = require('express');

var router = express.Router();

// GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
*/
const mysql = require('mysql');
const express = require('express')
const app = express();
const PORT = 8080;

const connection = mysql.createConnection({
    host: '130.225.170.71',
    user: 'root1',
    password: 'root1Root1&',
    database: 'WebPage',
    port: 3306
});




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

/*
app.get ('/tshirt',(req, res)=>{
    res.status(200).send({
        tshirt:'blue',
        size: 'large'
    })
})

 */

app.post('/tshirt/:id', (req, res) =>{
    const {id} = req.params;
    const {color} = req.body;

    if (!color){
        res.status(418).send({message: 'We need a color'})
    }

    res.send({
        tshirt: ` coloured ${color} and an ID of ${id}`,
    })
})
