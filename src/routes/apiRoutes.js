const express = require('express');
const router = express.Router();
const { calculatePrice } = require('../controllers/pricingController');


router.post('/calculate-price', calculatePrice);

module.exports = router;
