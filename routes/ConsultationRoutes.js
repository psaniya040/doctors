

const express = require('express');
const router = express.Router();

const { 
    startConsultation, 
    endConsultation, 
    getChatSetup,
    
} = require('../controllers/consultationController'); 

const { 
    protect, 
    isDoctor, 
    isParticipant 
} = require('../middleware/authMiddleware'); 

router.post('/:appointmentId/start', protect, isParticipant, startConsultation);
router.post('/:appointmentId/end', protect, isDoctor, endConsultation);
router.get('/:appointmentId/chat-setup', protect, isParticipant, getChatSetup);

module.exports = router;