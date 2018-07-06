const express = require('express');
const router = express.Router();
const app = express();
const mongo = require('mongodb').MongoClient;
var q2m = require('query-to-mongo')

// logging
const morgan = require('morgan'); 
app.use(morgan('dev'));

app.get('/', (req, res) => {
    let queries = req.query;
    let mongoQueries = q2m(queries);
    let criteria = mongoQueries.criteria;

    // let numberOfParmas = Object.keys(criteria).length;
    // if (numberOfParmas > 1) {
    //     // CONCAT PARAM { $and: [{ price: { $ne: 1.99 } }, { price: { $exists: true } }] }
    // }
    // Otherwise...
    // SINGLE PARAM {  amount: { $gt: 100 } }

    console.log("Search Citeria : ", criteria);

    const uri = "mongodb+srv://agbales:" + process.env.MONGO_ATLAS_PW + "@trump-spending-bbdqf.gcp.mongodb.net/propublica_trump_spending";
    mongo.connect(uri, { useNewUrlParser: false }, function(err, client) {
        const collection = client.db("trump-spending").collection("propublica_trump_spending");
        collection.find(criteria)
            .toArray()
            .then(resp => {
                res.status(200).json({ 
                    query: criteria,
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

module.exports = app;