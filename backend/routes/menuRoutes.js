const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');

router.get('/', getMenuItems);
router.post('/', auth, addMenuItem);
router.put('/:id', auth, updateMenuItem);
router.delete('/:id', auth, deleteMenuItem);

module.exports = router;
