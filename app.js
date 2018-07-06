const express = require('express');
const app = express();
const mongoose = require('mongoose');

// logging
const morgan = require('morgan'); 
app.use(morgan('dev'));

// mongoose
const spendingRoutes = require('./api/routes/spending');
const mongooseOptions = { useNewUrlParser: false };
mongoose.connect('mongodb+srv://agbales:' + process.env.MONGO_ATLAS_PW + 
                '@trump-spending-bbdqf.gcp.mongodb.net/propublica_trump_spending?retryWrites=true?replicaSet=set-999999999999999999999999', mongooseOptions);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongoose connected')
});

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