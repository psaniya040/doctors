

const express = require('express');
const router = express.Router();

const { 
    scheduleAppointment, 
    getAppointments, 
    cancelAppointment, 
    getDoctorAvailability 
} = require('../controllers/appointmentController'); 

const { 
    protect, 
    isPatient, 
    isDoctor 
} = require('../middleware/authMiddleware'); 

router.get('/doctors/:doctorId/availability', getDoctorAvailability);
router.post('/schedule', protect, isPatient, scheduleAppointment);
router.get('/my-appointments', protect, isPatient, getAppointments);
router.post('/:appointmentId/cancel', protect, isPatient, cancelAppointment);
router.get('/doctor-appointments', protect, isDoctor, getAppointments);

module.exports = router;