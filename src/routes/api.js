const express = require('express');
const router = express.Router();

const AuthenticationController  = require('../app/controllers/AuthenticationController');

// @route api/auth/register

router.get('/auth/register', AuthenticationController.index)

module.exports = router;
