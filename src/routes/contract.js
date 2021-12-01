const express = require('express');
const router = express.Router();

const {
    createContract,
    returnAllContracts,
    getPayload
} = require('../controller/ContractController');

router.post('/create', createContract);

router.get('/',returnAllContracts);

router.post('/finish/:pilotId/:contractId',getPayload);

module.exports = router;