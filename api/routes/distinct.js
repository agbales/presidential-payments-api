const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const axios = require('axios');
require('dotenv').config()
const uri = 'mongodb+srv://agbales:' + process.env.MONGO_ATLAS_PW + '@trump-spending-bbdqf.gcp.mongodb.net/propublica_trump_spending';

router.get('/', function(req, res) {
    mongo.connect(uri, { useNewUrlParser: false }, function(err, client) {
        const collection = client.db('trump-spending').collection('propublica_trump_spending');
        collection.findOne({})
            .then(entry => {
                let keys = []
                for (var key in entry) { 
                    keys.push(key)
                }
                keys = keys.filter(key => key !== '_id');
                return keys;
            })
            .then(keys => {
                const results = keys.map(async key => {
                    let distinctValues = collection.distinct(key)
                            .then(resp => {
                                return { [key] : resp };
                            })
                            .catch(err => console.log(err))
                    return distinctValues;
                })

                Promise.all(results)
                    .then(response => {
                        client.close();
                        console.log(response);
                        res.status(200).json(response);
                    })
            })
            .catch(err => {
                res.status(500).json({
                    message: err
                });
            });
    })
});

module.exports = router;