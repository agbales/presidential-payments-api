const express = require('express');
const router = express.Router();
const app = express();
const distinctRoute = require('./routes/distinct');
const expendituresRoute = require('./routes/expenditures');

// Logging
const morgan = require('morgan'); 
app.use(morgan('dev'));

// Headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// Routes
app.use('/distinct', distinctRoute);
app.use('/expenditures', expendituresRoute);


// - - - - - - - Look for distinct value requests EX: "type=distinct"

// Object.entries(criteria).forEach(entry => {
//     let key = entry[0];
//     let value = entry[1];
//     if (value == "distinct") {
//         collection.distinct(key)
//             .then(resp => {
//                 let distinct = { [key] : resp }
//                 console.log(distinct);
//                 // Finding a way to not disrupt rest of queries...
//                 // May need to be its own route
//                 delete criteria[key];
//             })
//     }
// })
//------------------

module.exports = app;
