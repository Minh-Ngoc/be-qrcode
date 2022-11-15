const express = require('express');
const router = express.Router();

const TestQRController = require('../app/controllers/TestQRController');

router.get('/:id/qrcode', TestQRController.index);

module.exports = router;
