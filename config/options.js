const options = {
    origin: '*',
    allowHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'X-Requested-With',
        'Origin'
    ],
    methods: 'POST, GET, PATCH, PUT, DELETE',
    optionsSuccessStatus: 200,
    preflightContinue: false
};

module.exports = options;