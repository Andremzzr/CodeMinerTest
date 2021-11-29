const express = require('express');
const router = express.Router();

const {
    createPilot
} = require('../controller/PilotController');

router.post('/create', createPilot);



module.exports = router;