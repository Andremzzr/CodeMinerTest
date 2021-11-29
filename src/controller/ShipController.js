const Ship  = require('../models/Ship');


module.exports = {
    createShip: async(req,res) => {
        try{
            const {pilotId} = req.params;

            const findingPilot = await Ship.findOne({pilotId: pilotId});

            if(findingPilot != undefined){
                console.log(`${pilotId} tried to create another ship`);
                return res.send("This pilot already has a ship");
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

            res.send(`Ship created successfully`);

            console.log(ship);

        }
        catch(error){
            console.log(error);

            return res.status(400).send("Ship creation failed");
        }
    }
}