const express = require('express');
const app = express();
const mongoose = require('mongoose');

// logging
const morgan = require('morgan'); 
app.use(morgan('dev'));

const spendingRoutes = require('./api/routes/spending');

mongoose.connect('mongodb+srv://agbales:' + process.env.MONGO_ATLASS_PW + '@trump-spending-bbdqf.gcp.mongodb.net/test?retryWrites=true',{
    useMongoClient: true
})

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