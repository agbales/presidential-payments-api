const express = require('express');
const router = express.Router();
const app = express();
const distinctRoute = require('./routes/distinct');
const expendituresRoute = require('./routes/expenditures');

// Logging
const morgan = require('morgan'); 
app.use(morgan('dev'));

// Headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// Routes
app.use('/distinct', distinctRoute);
app.use('/expenditures', expendituresRoute);

module.exports = app;
