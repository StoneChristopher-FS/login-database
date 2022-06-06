const express = require('express');
const req = require('express/lib/request');
const app = express();
const userRoute = require('../api/routes/userRoute');
app.use(express.json());

// handle all CORS issues by supplying CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE');
    }
    next();
});

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
