
cconst express = require('express');
const router = express.Router();

// Controllers
const { setDoctorAvailability, getDoctorAvailability } = require('../controllers/availabilityController');

// Middleware
const { protect, isDoctor } = require('../middleware/authMiddleware');

/**
 * @route   POST /api/availability/doctors/availability
 * @desc    Set or update doctor availability (doctors only)
 * @access  Private
 */
router.post('/doctors/availability', protect, isDoctor, setDoctorAvailability);

/**
 * @route   GET /api/availability/doctors/:doctorId/availability
 * @desc    Get availability for a specific doctor
 * @access  Public
 */
router.get('/doctors/:doctorId/availability', getDoctorAvailability);

module.exports = router;