
const express = require('express');
const router = express.Router();
const { setDoctorAvailability, getDoctorAvailability } = require('./availabilityController');
const { protect, isDoctor } = require('./middleware/authMiddleware'); 

router.post('/doctors/availability', protect, isDoctor, setDoctorAvailability);
router.get('/doctors/:doctorId/availability', getDoctorAvailability);

module.exports = router;