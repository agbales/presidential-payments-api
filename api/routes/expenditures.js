const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const q2m = require('query-to-mongo');

router.get('/', function(req, res) {

    let queries = req.query;
    let mongoQueries = q2m(queries);
    let criteria = mongoQueries.criteria;

    const uri = 'mongodb+srv://agbales:' + process.env.MONGO_ATLAS_PW + '@trump-spending-bbdqf.gcp.mongodb.net/propublica_trump_spending';
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