
const express = require('express');
const router = express.Router();
const { processPayment } = require('./paymentController');
const { protect } = require('./middleware/authMiddleware'); 

router.post('/payments/process', protect, processPayment); 

module.exports = router;