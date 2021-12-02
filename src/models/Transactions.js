const mongoose = require('mongoose');


const TransactionsSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    }

},{collection : 'transactions'});


const Transactions = mongoose.model('Transactions', TransactionsSchema);

module.exports  = Transactions;