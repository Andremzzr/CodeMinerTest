const mongoose = require('mongoose');


const ContractSchema = new mongoose.Schema({
    description : {
        type: String,
        required: true
    },
    payload : {
        type : String,
        required: true
    },
    originPlanet : {
        type: String,
        required: true
    },
    destinationPlanet : {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }

},{collection : 'contracts'});


const Contract = mongoose.model('Contract', ContractSchema);

module.exports  = Contract;