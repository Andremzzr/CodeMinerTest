const Contract = require('../models/Contract');

module.exports = {
    createContract: async(req,res) => {
        try{

            const {
                description,
                payload,
                originPlanet,
                destinationPlanet,
                value
            } = req.body;

            const contract = await Contract.create({
                description,
                payload,
                originPlanet ,
                destinationPlanet,
                value
            });

            return res.send({message: "Contract created"});

        }
        catch(err){
            console.log(err);
            return res.status(400).send({error: 'Contract Creation failed'});
        }
    },


    returnAllContracts : async(req,res) => {
        const contracts = await Contract.find({});
        return contracts == 0 ? res.send({message: "There's no contract available"}): res.send(contracts);
    }
}



