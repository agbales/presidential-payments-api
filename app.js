const express = require('express');
const app = express();

// logging
const morgan = require('morgan'); 
app.use(morgan('dev'));

const spendingRoutes = require('./api/routes/spending');

app.use('/spending', spendingRoutes);
app.use((req, res, next) => {
    res.status(200).json({
        message: "Got it"
    });
});

// error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ 
        error: { 
            message: error.message 
        }
    })
})

module.exports = app;