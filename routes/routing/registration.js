const express = require('express');
const router = express.Router();

router.get('/registration', (req, res) => {
    res.send('Welcome to registration!');
});

module.exports = router