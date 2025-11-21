

const express = require('express');
const router = express.Router();
const { 
    setDoctorAvailability, 
    getDoctorAvailability 
} = require('../controllers/availabilityController'); 

const { 
    protect, 
    isDoctor 
} = require('../middleware/authMiddleware'); 


router.post('/set-schedule', protect, isDoctor, setDoctorAvailability);
router.get('/doctors/:doctorId', getDoctorAvailability);

module.exports = router;