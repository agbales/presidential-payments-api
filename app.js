const express = require('express');
const app = express();

const spendingRoutes = require('./api/routes/spending');

app.use('/spending', spendingRoutes);

app.use((req, res, next) => {
    res.status(200).json({
        message: "Got it"
    });
});

module.exports = app;