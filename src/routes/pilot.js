const express = require('express');
const router = express.Router();

const {
    createPilot,
    getContract
} = require('../controller/PilotController');

router.post('/create', createPilot);

router.get('/contract/:contractId/:pilotId', getContract);


module.exports = router;