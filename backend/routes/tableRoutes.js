const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getTables,
  addTable,
  deleteTable,
} = require('../controllers/tableController');

router.get('/', auth, getTables);
router.post('/', auth, addTable);
router.delete('/:id', auth, deleteTable);

module.exports = router;
