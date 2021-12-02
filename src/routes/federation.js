const express = require('express');
const router = express.Router();

const {
    allPilots,
    allTransactions
} = require('../controller/FederationController');

router.get('/transactions', allTransactions);




module.exports = router;