const express = require('express');
const router = express.Router();

const {
    createContract,
    returnAllContracts
} = require('../controller/ContractController');

router.post('/create', createContract);

router.get('/',returnAllContracts);

module.exports = router;