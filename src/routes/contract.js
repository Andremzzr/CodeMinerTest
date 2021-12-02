const express = require('express');
const router = express.Router();

const {
    createContract,
    returnAllContracts,
    getPayload,
    deliverPayload
} = require('../controller/ContractController');

router.post('/create', createContract);

router.get('/',returnAllContracts);

router.post('/finish/:pilotId/:contractId',getPayload);

router.post('/deliver/:pilotId/:contractId',deliverPayload);

module.exports = router;