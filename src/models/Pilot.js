const mongoose = require('mongoose');


const PilotSchema = new mongoose.Schema({
    certification : {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type : Number,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    payload: {
        type: Array,
        default : []
    },
    location: {
        type: String,
        required: true
    },
    contracts : {
        type: Array,
        default: []
    },
    shipId : {
        type: String,
        default : ""
    }

},{collection : 'pilots'});


const Pilot = mongoose.model('Pilot', PilotSchema);

module.exports  = Pilot;