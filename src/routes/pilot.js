const express = require('express');
const router = express.Router();

const {
    createPilot,
    getContract,
    travel
} = require('../controller/PilotController');

router.post('/create', createPilot);

router.get('/contract/:contractId/:pilotId', getContract);

router.get('/travel/:pilotId/:planet',travel);

    

module.exports = router;