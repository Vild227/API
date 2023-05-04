const express = require('express');
const router = express.Router();

router.get('/payment', (req, res) => {
    res.send('Welcome to payment!');
});

module.exports = router