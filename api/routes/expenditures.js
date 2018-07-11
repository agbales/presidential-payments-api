const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const q2m = require('query-to-mongo');
require('dotenv').config()
const uri = 'mongodb+srv://agbales:' + process.env.MONGO_ATLAS_PW + '@trump-spending-bbdqf.gcp.mongodb.net/propublica_trump_spending';

function isQueryValid(queries) {
    let validity = true;
    let keys = Object.keys(queries);
    let validKeys = ['type', 'source', 'date', 'amount', 'purpose_scrubbed', 'property_scrubbed', 'purpose', 'property', 'city', 'state'];
    keys.forEach(key=>{
        if (!validKeys.includes(key.toLowerCase())) {
            validity = false;
        }
    });
    return validity;
}

router.get('/', function(req, res) {
    let queries = req.query;
    let mongoQueries = q2m(queries);
    let criteria = mongoQueries.criteria;

    if(!isQueryValid(criteria)) {
        return res.status(400).send({code: 'BadRequest', message: 'Invalid query present. See /distinct.'})
    }

    mongo.connect(uri, { useNewUrlParser: false }, function(err, client) {
        const collection = client.db('trump-spending').collection('propublica_trump_spending');
        collection.find(criteria)
            .toArray()
            .then(resp => {
                res.status(200).json({ 
                    response_total: resp.length,
                    expenditures: resp
                })
                client.close();
            })
            .catch(err => {
                res.status(500).json({
                    message: err
                });
            });
    });
});

module.exports = router;