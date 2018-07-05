const express = require('express');
const router = express.Router();

const Expenditure = require('../models/expenditure');

router.get('/', (req, res, next) => {
    let queries = req.query;
    res.status(200).json({
        message: 'Handling GET to /spending',
        queries: queries
    })
});

router.get('/:source', (req, res, next) => {
    const source = req.params.source;
    const queries = req.query;
    const parsed = queryString.parse(req.query);

    if (source == "all") {
        res.status(200).json({ 
            message: "return all sources :) "
        });
    } else {
        res.status(200).json({ 
            message: "all sources :) ",
            query: queries,
            queryString: parsed
        });
    }
});

router.get('/:date', (req, res, next) => {
    const date = req.params.date
    // filter... 
    // res.status(200).json({ ... })
});

router.get('/:amount', (req, res, next) => {
    const amount = req.params.amount
    // filter for payments within a range... 
    // res.status(200).json({ ... })
});

router.get('/:purpose', (req, res, next) => {
    const purpose = req.params.purpose
    // all...
    // filter ... 
    // res.status(200).json({ ... })
});

router.get('/:property', (req, res, next) => {
    const property = req.params.property
    // all ...
    // filter ... 
    // res.status(200).json({ ... })
});

router.get('/:location', (req, res, next) => {
    const location = req.params.location
    // all ...
    // city/state... 
    // res.status(200).json({ ... })
});

module.exports = router;