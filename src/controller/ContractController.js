const Contract = require('../models/Contract');
const Pilot = require('../models/Pilot');
const Transactions = require('../models/Transactions');

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

            console.log(`Contrac created id: ${contract.id}`);
            return res.send({message: "Contract created"});

        }
        catch(err){
            console.log(err);
            return res.status(400).send({error: 'Contract Creation failed'});
        }
    },


    returnAllContracts : async(req,res) => {
        const contracts = await Contract.find({});
        return contracts == 0 ? res.send({message: "There are no contract available"}): res.send(contracts);
    },

    getPayload : async(req,res) => {

        try{
            const {pilotId, contractId} = req.params;


            const pilot = await Pilot.findOne({certification: pilotId});
            const contract = await Contract.findOne({_id: contractId});

            

            if(pilot == undefined){
                return res.send({message: "This pilot doesn't exists"});
            }
            
            if(contract == undefined){
                return res.send({message: "This contract doesn't exists"});
            }
            
            if(contract.originPlanet.toUpperCase() != pilot.location.toUpperCase()){
                return res.send({message: `You are not in ${contract.originPlanet}`});
            }

            if(contract.onBoard == true){
                return res.send({message: `The payload is on board`});
            }

            //HANDLE CONTRACTS
            if(pilot.contracts.length > 0){
                let comfirmed = false;
                pilot.contracts.forEach(pilotContract => {
                    if(pilotContract.contractId == contract.id && pilotContract.location.toUpperCase() == pilot.location.toUpperCase()){
                        
                        pilot.payload.push({
                            contractId: contract.id,
                            payload : JSON.parse(contract.payload)
                        });
                        comfirmed = true;
                    }
                })
                
                if(comfirmed == true){
                    Pilot.updateOne({certification: pilotId},
                    {
                        payload: pilot.payload
                    })
                    .then(ex => {
                        Contract.updateOne({_id: contractId},
                            {onBoard: true})
                        .then(upd => {
                            return res.send({message: `Pilot ${pilotId} has gotten the payload from ${contractId}`})
                        })
                    })
                }
                else{
                    return res.send({message: "The contract is not available"})
                }

            }

        }
        catch(err){
            console.log(err);
            return res.status(400).send({message: "Error"});
        }
    },



    deliverPayload : async(req,res) => {
        try{

            const {
                pilotId,contractId
            } = req.params;

            const pilot = await Pilot.findOne({certification: pilotId});
            const contract = await Contract.findOne({_id: contractId});

            if(pilot == undefined){
                return res.send({message: "This pilot doesn't exists"});
            }
            
            if(contract == undefined){
                return res.send({message: "This contract doesn't exists"});
            }
            
            if(contract.destinationPlanet.toUpperCase() != pilot.location.toUpperCase()){
                return res.send({message: `You are not in ${contract.destinationPlanet}`});
            }

            if(contract.onBoard == false){
                return res.send({message: `The contract insn't on board`});
            }



            if(pilot.payload.length > 0){
                let comfirmed = false;
                pilot.payload.forEach((pilotPayload,index) => {
                    if(pilotPayload.contractId == contract.id){
                        
                        pilot.payload.splice(index,1);
                        comfirmed = true;
                    }
                })


                if(comfirmed == true){
                    pilot.contracts.forEach((pilotContract,index) => {
                        if(pilotContract.contractId == contractId){
                            pilot.contracts.splice(index,1);
                        }
                    });
    
    
                    Pilot.updateOne({certification: pilotId},
                    {
                        payload: pilot.payload,
                        contracts: pilot.contracts,
                        credits: pilot.credits + contract.value
                    })
                    .then(ex => {
                        Contract.deleteOne({_id: contractId})
                        .then(async(upd) => {
                            const newMessage = `Contract ${contract.id} paid to ${pilot.name}: -₭${contract.value}`;
                            const transaction = await Transactions.create({description: newMessage});
                            console.log(newMessage);
                            return res.send({message: `Contract - ${contractId} has been finishied by ${pilotId}`})
                        })
                    })
                }
            }

            
        }
        catch(err){
            console.log(err);
            return res.send({message: 'Error'});
        }
    }
}



