const mongoose = require('mongoose');

const expenditureSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    source: String,
    date: String,
    amount: String,
    purpose_scrubbed: String,
    property_scrubbed: String,
    purpose: String,
    property: String,
    city: String,
    state: String
})

module.exports = mongoose.model('Expenditures', expenditureSchema, 'propublica_trump_spending');