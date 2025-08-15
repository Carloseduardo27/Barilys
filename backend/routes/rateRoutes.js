const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getExchangeRate } = require('../controllers/rateController');

router.get('/', auth, getExchangeRate);

module.exports = router;
