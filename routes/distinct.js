const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;

router.get('/', function(req, res) {
    const uri = 'mongodb+srv://agbales:' + process.env.MONGO_ATLAS_PW + '@trump-spending-bbdqf.gcp.mongodb.net/propublica_trump_spending';
    mongo.connect(uri, { useNewUrlParser: false }, function(err, client) {
        const collection = client.db('trump-spending').collection('propublica_trump_spending');
        collection.findOne({})
            .then(entry => {
                let keys = []
                for (var key in entry) { 
                    console.log(key) ; 
                    keys.push(key)
                }
                res.status(200).json(keys);
                client.close();
            })
            .catch(err => {
                res.status(500).json({
                    message: err
                });
            });
    })
});

module.exports = router;