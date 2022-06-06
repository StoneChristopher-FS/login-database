const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
    res.status(200).json({
        message: 'User Signup - POST',
        hostname: req.hostname
    });
});

router.post('/login', (req, res) => {
    res.status(200).json({
        message: 'User Login - POST',
        hostname: req.hostname
    });
});

router.get('/profile', (req, res) => {
    res.status(200).json({
        message: 'User Profile - GET',
        hostname: req.hostname
    });
});

module.exports = router;