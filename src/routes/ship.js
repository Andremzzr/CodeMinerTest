const express = require('express');
const router = express.Router();

const {
    createShip
} = require('../controller/ShipController');

router.post('/create/:pilotId', createShip);



module.exports = router;