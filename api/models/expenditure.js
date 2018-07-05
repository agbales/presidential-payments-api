const mongoose = require('mongoose');

const expenditureSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    type: String,
    source: String,
    date: String,
    amount: Number,
    purpose_scrubbed: String,
    property_scrubbed: String,
    purpose: String,
    property: String,
    city: String,
    state: String
})

module.exports = mongoose.model('Expenditures', expenditureSchema);