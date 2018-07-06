const express = require('express');
const router = express.Router();
const app = express();

// logging
const morgan = require('morgan'); 
app.use(morgan('dev'));

const mongo = require('mongodb').MongoClient;
const uri = "mongodb+srv://agbales:" + process.env.MONGO_ATLAS_PW + "@trump-spending-bbdqf.gcp.mongodb.net/propublica_trump_spending";
mongo.connect(uri, { useNewUrlParser: false }, function(err, client) {
    const collection = client.db("trump-spending").collection("propublica_trump_spending");

    collection.findOne({type:"FEC"})
        .then(resp => {
            console.log(resp)
            // res.status(200).json({message: resp})
        })
        .catch(err => {
            res.status(500).json({
                message: err
            });
        });
    client.close();
});

app.get('/', (req, res) => {

});

module.exports = app;