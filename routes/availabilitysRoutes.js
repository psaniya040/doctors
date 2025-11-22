

const express = require('express');
const router = express.Router();

// Controllers
const { 
  setDoctorAvailability, 
  getDoctorAvailability 
} = require('../controllers/availabilityController');

// Middleware
const { 
  protect, 
  isDoctor 
} = require('../middleware/authMiddleware');

/**
 * @route   POST /api/availability/set-schedule
 * @desc    Set or update doctor availability (doctors only)
 * @access  Private
 */
router.post('/set-schedule', protect, isDoctor, setDoctorAvailability);

/**
 * @route   GET /api/availability/doctors/:doctorId
 * @desc    Get availability for a specific doctor
 * @access  Public
 */
router.get('/doctors/:doctorId', getDoctorAvailability);

module.exports = router;