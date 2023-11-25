const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/signup', authService.signup);
router.post('/signin', authService.signin);

module.exports = router;