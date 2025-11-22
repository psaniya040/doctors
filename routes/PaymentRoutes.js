const express = require('express');
const router = express.Router();

// Controllers
const { processPayment } = require('../controllers/paymentController');

// Middleware
const { protect } = require('../middleware/authMiddleware');

/**
 * @route   POST /api/payments/process
 * @desc    Process a payment
 * @access  Private (Authenticated users only)
 */
router.post('/process', protect, processPayment);

module.exports = router;