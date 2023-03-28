/*this file is basically product.js and app.js in one because i couldn't get it working
*/

const express = require('express')
const config = require('../db.js');
const connection = config.connection;
const app = express();
const cors = require('cors');
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.listen(
    PORT,
    () =>
    console.log(`its alive`)

)

app.get('/product', (req, res) => {
    connection.query('SELECT * FROM Product', (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: 'Error retrieving products from database' });
        } else {
            res.status(200).send(results);
            console.log("Succes")
        }
    });
});

app.post('/order', (req, res) => {
    const { firstName, lastName, Address, Address2, postNumber, City, Country, email, phone, Company, VAT, Comment, Subscribe, Conditions, Sum, items } = req.body;

    const parsedItems = JSON.parse(items);
    // First, insert the order into the orders table
    connection.query(
        'INSERT INTO orders (firstName, lastName, Address, Address2, postNumber, City, Country, email, phone, Company, VAT, Comment, Subscribe, Conditions, Sum) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [firstName, lastName, Address, Address2, postNumber, City, Country, email, phone, Company, VAT, Comment, Subscribe, Conditions, Sum],
        (error, result) => {
            if (error) {
                res.status(500).send('Error inserting order into database');
            } else {
                const orderId = result.insertId;

                // Then, insert each item in the order into the order_items table
                const itemValues = parsedItems.map((item) => [
                    orderId,
                    item.product_id,
                    item.quantity
                ]);
                connection.query(
                    'INSERT INTO order_items (order_id, product_id, quantity) VALUES ?',
                    [itemValues],
                    (error, result) => {
                        if (error) {
                            res.status(500).json({ message: 'Error inserting items into order' });
                        } else {
                            res.status(201).json({ message: `Created order with ID: ${orderId}` });
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




