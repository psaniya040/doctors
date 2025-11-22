const express = require('express');
const router = express.Router();

// Controllers
const { 
  startConsultation, 
  endConsultation, 
  getChatSetup
} = require('../controllers/consultationController');

// Middleware
const { 
  protect, 
  isDoctor, 
  isParticipant 
} = require('../middleware/authMiddleware');

/**
 * @route   POST /api/consultations/:appointmentId/start
 * @desc    Start a consultation (participants only)
 * @access  Private
 */
router.post('/:appointmentId/start', protect, isParticipant, startConsultation);

/**
 * @route   POST /api/consultations/:appointmentId/end
 * @desc    End a consultation (doctors only)
 * @access  Private
 */
router.post('/:appointmentId/end', protect, isDoctor, endConsultation);

/**
 * @route   GET /api/consultations/:appointmentId/chat-setup
 * @desc    Get chat setup details for a consultation (participants only)
 * @access  Private
 */
router.get('/:appointmentId/chat-setup', protect, isParticipant, getChatSetup);

module.exports = router;