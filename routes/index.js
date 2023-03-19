/*this file is basically product.js and app.js in one because i couldn't get it working
*/

const express = require('express')
const config = require('../db.js');
const connection = config.connection;
const app = express();
const PORT = 8080;

app.use(express.json());

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

app.post('/order', (req, res) => {
    const { customer_name, customer_email, items } = req.body;

    // First, insert the order into the orders table
    connection.query(
        'INSERT INTO orders (customer_name, customer_email) VALUES (?, ?)',
        [customer_name, customer_email],
        (error, result) => {
            if (error) {
                res.status(500).send('Error inserting order into database');
            } else {
                const orderId = result.insertId;

                // Then, insert each item in the order into the order_items table
                const itemValues = items.map((item) => [
                    orderId,
                    item.product_id,
                    item.quantity
                ]);
                connection.query(
                    'INSERT INTO order_items (order_id, product_id, quantity) VALUES ?',
                    [itemValues],
                    (error, result) => {
                        if (error) {
                            res.status(500).send('Error inserting items into order');
                        } else {
                            res.status(201).send(`Created order with ID: ${orderId}`);
                        }
                    }
                );
            }
        }
    );
});

app.use((req, res, next) => {
    res.status(404).send('Sorry, we could not find that!');
});




