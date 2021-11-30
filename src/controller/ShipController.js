const Ship  = require('../models/Ship');
const Pilot = require("../models/Pilot");


module.exports = {
    createShip: async(req,res) => {
        try{
            const {pilotId} = req.params;


            //Validating pilot's id
            const findingPilotsShip = await Ship.findOne({pilotId: pilotId});
            const findingPilot = await Pilot.findOne({certification: pilotId});

            if(findingPilot == undefined){
                console.log(`${pilotId} tried to create another ship`);
                return res.send({
                    type: "error",
                    message: "Doesn't exists a pilot with id " + pilotId});
            }
            if(findingPilotsShip != undefined){
                console.log(`${pilotId} tried to create another ship`);
                return res.send({
                    type: "error",
                    message: "This pilot already has a ship"});
            }
            
            
            const 
            {   
                fuelCapacity,
                fuelLevel,
                weight
            } = req.body;

            

            const ship = await Ship.create
            ({  
                pilotId,
                fuelCapacity,
                fuelLevel,
                weight
            });

            const pilotUpdated = await Pilot.updateOne({certification: pilotId},{
                shipId : ship.id
            });

            res.send(`Ship created successfully`);

            console.log(ship);


        }
        catch(error){
            console.log(error);

            return res.status(400).send("Ship creation failed");
        }
    }
}