const express = require('express');
const userService = require('../services/userService');

const router = express.Router();

router.get('/user/:email', userService.getUser);

module.exports = router;