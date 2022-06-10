const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../model/user');
const db = require('../../db/db');

router.post('/signup', (req, res) => {
    // find a user by email
    // if user then email exists
    // else
    // make our user model or object
    // encrypt
    // save to mongodb

    db.findUser(req.body.email)
    .then((user) => {
        if(user) {
            res.status(409).json({
                message: 'User Already Created. Please Log In...'
            });
        } else {
            const password = req.body.password
            bcrypt.hash(password, 10, (err, hash) => {
                if(err) {
                    res.status(500).json({
                        message: 'Password cant be hashed!',
                        error: err.message
                    });
                } else {
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        address: req.body.address,
                        city: req.body.city,
                        state: req.body.state,
                        zipcode: req.body.zipcode
                    });

                    // save to mongodb
                    db.saveUser(user)
                    .then((result) => {
                        res.status(201).json({
                            name: result.firstName,
                            email: result.email
                        });
                    })
                    .catch((err) => {
                        res.status(409).json({
                            message: 'Unable to add user!',
                            error: err.message
                        });
                    });
                }
            });
        }
    })
    .catch((err) => {
        res.status(500).json({
            message: 'Not able to search for user!',
            error: err.message
        })
    })
});

router.post('/login', (req, res) => {
    // find user by email
    // if no user found then authorization failed
    // else
    // user returned with user info and a HASHED password

    db.findUser(req.body.email)
    .then((user) => {
        if(user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) return res.status(501).json({message: err.message})
                if(result) {
                    res.status(200).json({
                        message: 'Login - POST, Authoization Successful',
                        result: result,
                        name: req.body.firstName
                    });
                } else {
                    res.status(409).json({
                        message: 'Authorization Failed'
                    });
                }
            });
        } else {
            res.status(409).json({
                message: 'User not found, please signup before logging in'
            });
        }
    })
    .catch((err) => {
        res.status(409).json({
            message: 'Not able to search for user!',
            error: err.message
        });
    });
});

router.get('/profile', (req, res) => {
    res.status(200).json({
        message: 'User Profile - GET',
        hostname: req.hostname
    });
});

module.exports = router;