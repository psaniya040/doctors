

const express = require('express');
const router = express.Router();

// Controllers
const { 
  getPatientProfile, 
  updatePatientProfile, 
  uploadDocument,
  getPatientEHR,
  getPatientPrescriptions 
} = require('../controllers/patientController');

// Middleware
const { 
  protect, 
  isPatient 
} = require('../middleware/authMiddleware');

// Apply protection + patient role check to all routes in this file
router.use(protect, isPatient);

/**
 * @route   GET /api/patient/profile
 * @desc    Get logged-in patient's profile
 * @access  Private (Patient only)
 */
router.get('/profile', getPatientProfile);

/**
 * @route   PUT /api/patient/profile
 * @desc    Update logged-in patient's profile
 * @access  Private (Patient only)
 */
router.put('/profile', updatePatientProfile);

/**
 * @route   POST /api/patient/upload-document
 * @desc    Upload a medical document
 * @access  Private (Patient only)
 */
router.post('/upload-document', uploadDocument);

/**
 * @route   GET /api/patient/ehr
 * @desc    Get patient's electronic health records
 * @access  Private (Patient only)
 */
router.get('/ehr', getPatientEHR);

/**
 * @route   GET /api/patient/prescriptions
 * @desc    Get patient's prescriptions
 * @access  Private (Patient only)
 */
router.get('/prescriptions', getPatientPrescriptions);

module.exports = router