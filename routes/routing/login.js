const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.send('Welcome to login!');
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/failure'
}));

// Add success and failure routes
router.get('/success', (req, res) => {
    res.send('Login successful');
});

router.get('/failure', (req, res) => {
    res.status(401).send('Login failed');
});

module.exports = router;


