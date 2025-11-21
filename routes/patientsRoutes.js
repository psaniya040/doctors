

const express = require('express');
const router = express.Router();

const { 
    getPatientProfile, 
    updatePatientProfile, 
    uploadDocument,
    getPatientEHR,
    getPatientPrescriptions 
} = require('../controllers/patientController'); 

const { 
    protect, 
    isPatient 
} = require('../middleware/authMiddleware'); 


router.use(protect, isPatient);
router.get('/profile', getPatientProfile);
router.put('/profile', updatePatientProfile);
router.post('/upload-document', uploadDocument);
router.get('/ehr', getPatientEHR);
router.get('/prescriptions', getPatientPrescriptions);


module.exports = router;