const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../model/user');
const db = require('../../db/db');
const checkAuth = require('../../auth/checkAuth');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
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
                        zip: req.body.zip
                    });

                    // save to mongodb
                    db.saveUser(user)
                    .then((result) => {
                        res.status(201).json({
                            message: 'User added successfully!',
                            firstName: result.firstName,
                            lastName: result.lastName,
                            email: result.email,
                            password: req.body.password,
                            hash: result.password,
                            address: result.address,
                            city: result.city,
                            state: result.state,
                            zip: result.zip
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
    db.findUser(req.body.email)
    .then((user) => {
        if(user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) return res.status(501).json({message: err.message})
                if(result) {
                    const firstName = user.firstName;
                    const lastName = user.lastName;
                    const email = req.body.email;
                    const id = req.body.id;
                    const token = jwt.sign({firstName: firstName, lastName: lastName, email: email, userId: id}, process.env.jwt_key)

                    res.status(200).json({
                        message: 'Welcome , Authorization Successful',
                        result: result,
                        name: req.body.firstName,
                        token: token
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

router.get('/profile', checkAuth, (req, res) => {   
    res.status(200).json({
        message: "Token Verified Successfully",
        info: req.userData 
    });
});

module.exports = router;