const Pilot = require('../models/Pilot');
const Transactions = require("../models/Transactions");

module.exports = {
    allPilots : async(req,res) => { 
        const pilots = await Pilot.find({});
        
        const newPilots = pilots.filter(pilot => {
            let payload = {water: 0,food: 0, minerals: 0};
            payload = pilot.payload.forEach()
            return {
                id : pilot.certification,
                resources : ""
            }
        
        
        }
        );




        
    },


    allTransactions : async(req,res) => {
            const transactions = await Transactions.find({});
            
            if(transactions.legth == 0){
                return res.send({message: "There are no transactions registered"});
            }

            console.log(transactions);
            const transactionsDescs = transactions.map(trans => {
                return trans.description;
            })
            
            return res.send(transactionsDescs);

    }
}