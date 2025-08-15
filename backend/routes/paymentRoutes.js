const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  processPayment,
  getDailyPayments,
} = require('../controllers/paymentController');

router.post('/', auth, processPayment);
router.get('/today', auth, getDailyPayments);

module.exports = router;
