const express = require('express');
const router = express.Router();
const { User } = require('../index'); // Import the User model from your index.js file

router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ where: { username } });
        res.json({ exists: !!user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error checking username');
    }
});

module.exports = router;