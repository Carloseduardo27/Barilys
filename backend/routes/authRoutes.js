const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// @route   POST api/auth
// @desc    Autenticar usuario y obtener token (Login)
// @access  Public
router.post('/', login);

module.exports = router;
