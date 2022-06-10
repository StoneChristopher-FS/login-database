const express = require('express');
const app = express();
const cors = require('cors');
const options = require('../config/options');
const userRoute = require('../api/routes/userRoute');
app.use(express.json());
app.use(cors(options));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Service is up!',
        method: 'req.method'
    });
});

app.use('/users', userRoute);

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

module.exports = app;
