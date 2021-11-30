const mongoose = require('mongoose');


const ShipSchema = new mongoose.Schema({
    pilotId : {
        type: String,
        required: true,
    },
    fuelCapacity: {
        type: Number,
        required: true
    },
    fuelLevel: {
        type: Number,
        required: true
    },
    weight : {
        type : Number,
        required : true
    },
    currentWeight : {
        type : Number,
        default: 0
    }
},{collection : 'ships'});


const Ship = mongoose.model('Ship', ShipSchema);

module.exports  = Ship;