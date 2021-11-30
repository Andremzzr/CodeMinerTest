const Pilot = require('../models/Pilot.js');
const Contract = require('../models/Contract');
const generateCertification = require('../utils/generateCertification');

module.exports = {
    createPilot: async(req,res) => {
        try{

            const {name,age,credits,location} = req.body;

            console.log(name);

            const certification = generateCertification(name.slice(0,1));

            const pilot = await Pilot.create({
                certification,
                name,
                age,
                credits,
                location
            })

            return res.send(`Pilot created: id ${pilot.id}`);

        }
        catch(err){
            console.log(err);
            return res.status(400).send({error: 'Pilot Creation failed'});
        }
    },


    getContract : async(req,res) => {
        const { contractId, pilotId} = req.params;
        console.log(contractId)
        const pilot = await Pilot.findOne({certification: pilotId});
        const contract = await Contract.findOne({id: contractId});

        if(pilot == undefined || contract == undefined){
            return res.send({message: "One of the id's is wrong"});
        };
        if(contract.open == false){
            return res.send({message: "This contract isn't available"});
        }

        pilot.contracts.push(contractId);
        Contract.updateOne({id: contractId},{open : false})
        .then( contractUpdated => {
            Pilot.updateOne({certification: pilotId},
            {contracts : pilot.contracts })
            .then(pilotUpdated => {

                console.log(`Contract ${contractId} was gotten by pilot ${pilotId}`);
                return res.send({message: "Contract claimed successfully"});    
            });
        });
        
        

        
    }
}



