const express = require('express');
const router = express.Router();

router.get('/checkoutform', (req, res) => {
    res.send('Welcome to checkoutform!');
});

module.exports = router