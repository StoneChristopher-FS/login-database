const express = require('express');
const app = express();
const cors = require('cors');
const options = require('../config/options');
const mongoose = require('mongoose')
const router = require('../api/routes/router');
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../config/swaggerOptions");
require('dotenv').config();
app.use(express.json());
app.use(cors(options));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Service is up!',
        method: 'req.method'
    });
});

app.use('/users', router);

// middleware to api-docs
console.log(swaggerDocs);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// add middleware to handle and bad url paths
app.use((req, res, next) => {
    const error = new Error('NOT FOUND!!!');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status
        }
    });
});

// connect to mongodb
mongoose.connect(process.env.mongoDBURL, (err) => {
    if(err) {
        console.error('Error', err.message)
    }
    else {
        console.log('MongoDB Connection Successful')
    }
})

module.exports = app;
