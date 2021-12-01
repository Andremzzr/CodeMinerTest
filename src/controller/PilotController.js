const Pilot = require('../models/Pilot.js');
const Contract = require('../models/Contract');
const Ship = require('../models/Ship');
const Travel = require('../classes/Travel');

const generateCertification = require('../utils/generateCertification');

module.exports = {
    createPilot: async(req,res) => {
        const locations = ['DEMETER','CALAS','AQUA','ANDVARI'];
        try{
            
            const {name,age,credits,location} = req.body;

            if(!locations.includes(location.toUpperCase())){
                return res.send({message: `${location} doesn't exists`})
            }

            

            const certification = generateCertification(name.slice(0,1));

            const pilot = await Pilot.create({
                certification,
                name,
                age,
                credits,
                location: location.toUpperCase()
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

        const pilot = await Pilot.findOne({certification: pilotId});
        const contract = await Contract.findOne({_id: contractId});



        if(pilot == undefined || contract == undefined){
            return res.send({message: "One of the id's is wrong"});
        };
        if(contract.open == false){
           return res.send({message: `The contract ${contract.id} isn't available`});
        }

        const ship = await Ship.findOne({_id: pilot.shipId});
        
        //Parsing the string from contract.paylaod and calculating it's weight 
        const contractPayload = JSON.parse(contract.payload);
        let contractWeight = 0;

        for(const key in contractPayload){
            contractWeight+= contractPayload[key];
        }


        //Verify if Pilot's Ship can carry the weight
        if(ship.weight < contractWeight + ship.currentWeight){
            return res.send({message: "The pilot's ship doesn't carry this amount of weight"});
        }

    

        pilot.contracts.push({
            contractId: contractId,
            location: contract.originPlanet,
            destination : contract.destinationPlanet
        });

        Contract.updateOne({_id: contractId},{open : false})
        .then( contractUpdated => {
            Pilot.updateOne({certification: pilotId},
            {contracts : pilot.contracts})
            .then(pilotUpdated => {
                console.log(`Contract ${contractId} was gotten by pilot ${pilotId}`);
                return res.send({message: "Contract claimed successfully"});    
            });
        });
        
    },


    travel: async(req,res)=> {
        try{
            const locations = ['DEMETER','CALAS','AQUA','ANDVARI'];
            const {planet, pilotId} = req.params;
            
            if(!locations.includes(planet.toUpperCase())){
                return res.send({message: `${planet} is not a planet`});
            }    

            const pilot = await Pilot.findOne({certification: pilotId});
            if(pilot == undefined){
                return res.send({message: 'This pilot was not found'});
            }

            console.log(pilot.location);
            console.log(planet);

            if(pilot == undefined){
                return res.send({message: "This pilot doesn't exists"});
            }

            const newTravel = new Travel(pilot.location.toUpperCase(),planet.toUpperCase());
            const travelResult = newTravel.travel();

            //TRAVEL VERIFICATION
            if(travelResult == 'x'){
                return res.send({message: `You can't go to this planet, the current route is blocked by asteroids`});
            }
            else if(travelResult == '-'){
                return res.send({message: `You're in this planet :P`});
            }
            else{
                const ship = await Ship.findOne({id: pilot.shipId});
                if(ship.fuelLevel < travelResult){
                    return res.send({message: `You can't do this travel, you don't have enough gas`});
                }

                const pilotUpdated = await Pilot.updateOne({certification: pilotId},
                    {
                        location: planet
                    });
                
                const shipUpdated = await Ship.updateOne({id: pilot.shipId},
                    {fuelLevel: ship.fuelLevel - travelResult}
                );

                return res.send({message: `You're now in ${planet}. Your ship is now with ${ship.fuelLevel - travelResult} of gas`});

            }
        }
        catch(err){
            console.log(err);
            return res.send({type: 'error', message: 'Travel failed'})
        }
    }


}



