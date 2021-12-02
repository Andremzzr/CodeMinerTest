const express = require('express');
const router = express.Router();

const {
    createPilot,
    getContract,
    travel,
    returnPilot
} = require('../controller/PilotController');

router.get('/profile/:pilotId', returnPilot);

router.post('/create', createPilot);

router.get('/contract/:contractId/:pilotId', getContract);

router.get('/travel/:pilotId/:planet',travel);



module.exports = router;