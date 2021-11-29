const Pilot = require('../models/Pilot.js');
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
    }
}



