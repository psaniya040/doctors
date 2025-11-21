
const Prescription = require('../models/Prescription'); 
const Referral = require('../models/Referral');
const ePrescribingService = require('../services/ePrescribingService'); 
const Patient = require('../models/Patient'); 


exports.createPrescription = async (req, res) => {
    try {
        const doctorId = req.user.id; 
        const { 
            patientId, 
            medicationName, 
            dosage, 
            instructions, 
            refills, 
            pharmacyPreference 
        } = req.body;

        const prescriptionData = {
            doctor: doctorId,
            patient: patientId,
            medicationName,
            dosage,
            instructions, 
            refills: refills || 0,
            pharmacyPreference 
        };
        const newPrescription = await Prescription.create(prescriptionData);

    
        const ePrescribeResult = await ePrescribingService.sendToPharmacy(
            newPrescription, 
            pharmacyPreference
        );

        res.status(201).json({
            success: true,
            message: 'Prescription issued and electronically sent to the pharmacy.',
            prescription: newPrescription,
            ePrescribeStatus: ePrescribeResult.status 
        });

    } catch (error) {
        console.error('Error creating prescription:', error);
        res.status(500).json({ message: 'Server error: Failed to create or send prescription.' });
    }
};


exports.createReferral = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const { 
            patientId, 
            specialistType, 
            reason, 
            referralCenterName 
        } = req.body;

        const newReferral = await Referral.create({
            doctor: doctorId,
            patient: patientId,
            specialistType,
            reason,
            referralCenterName,
            status: 'Pending'
        });

        
        res.status(201).json({
            success: true,
            message: 'Referral created successfully and pending review.',
            data: newReferral
        });

    } catch (error) {
        console.error('Error creating referral:', error);
        res.status(500).json({ message: 'Server error: Failed to create referral.' });
    }
};