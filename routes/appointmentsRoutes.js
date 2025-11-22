const express = require('express');
const router = express.Router();

// Controllers
const { 
  scheduleAppointment, 
  getAppointments, 
  cancelAppointment, 
  getDoctorAvailability 
} = require('../controllers/appointmentController');

// Middleware
const { 
  protect, 
  isPatient, 
  isDoctor 
} = require('../middleware/authMiddleware');

/**
 * @route   GET /api/appointments/doctors/:doctorId/availability
 * @desc    Get availability for a specific doctor
 * @access  Public
 */
router.get('/doctors/:doctorId/availability', getDoctorAvailability);

/**
 * @route   POST /api/appointments/schedule
 * @desc    Schedule a new appointment (patients only)
 * @access  Private
 */
router.post('/schedule', protect, isPatient, scheduleAppointment);

/**
 * @route   GET /api/appointments/my-appointments
 * @desc    Get logged-in patient's appointments
 * @access  Private
 */
router.get('/my-appointments', protect, isPatient, getAppointments);

/**
 * @route   DELETE /api/appointments/:appointmentId/cancel
 * @desc    Cancel an appointment (patients only)
 * @access  Private
 */
router.delete('/:appointmentId/cancel', protect, isPatient, cancelAppointment);

/**
 * @route   GET /api/appointments/doctor-appointments
 * @desc    Get logged-in doctor's appointments
 * @access  Private
 */
router.get('/doctor-appointments', protect, isDoctor, getAppointments);

module.exports = router;