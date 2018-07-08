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
                    keys.push(key)
                }
                return keys;
            })
            .then(keys => {
                let response = keys.map(key => {
                    return new Promise((resolve, reject) => {
                        collection.distinct(key)
                            .then(resp => {
                                console.log(resp);
                                return { [key] : resp };
                            })
                            .catch(err => console.log(err))
                    });
                })
    
                Promise.all(response)
                    .then(()=> {
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