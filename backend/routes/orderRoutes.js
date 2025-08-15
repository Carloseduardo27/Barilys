const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getActiveOrderForTable,
  addItemToOrder,
  clearOrder,
} = require('../controllers/orderController');

router.get('/table/:tableId', auth, getActiveOrderForTable);
router.post('/:orderId/add', auth, addItemToOrder);
router.post('/:orderId/clear', auth, clearOrder);

module.exports = router;
