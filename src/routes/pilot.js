const express = require('express');
const router = express.Router();

const {
    createPilot,
    getContract,
    travel,
    returnPilot,
    buyFuel
} = require('../controller/PilotController');

router.get('/profile/:pilotId', returnPilot);

router.get('/contract/:contractId/:pilotId', getContract);

router.get('/travel/:pilotId/:planet',travel);

router.post('/fuel/:pilotId', buyFuel)

router.post('/create', createPilot);




module.exports = router;