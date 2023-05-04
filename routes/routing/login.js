const express = require('express');
const router = express.Router();
const passport = require('passport');
router.get('/login', (req, res) => {
    res.send('Welcome to login!');
});

router.post('/', passport.authenticate('local'), (req, res) => {
    res.send('Login successful');
});

module.exports = router

