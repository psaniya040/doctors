
const Prescription = require('../models/Prescription');
const Referral = require('../models/Referral');
const ePrescribingService = require('../services/ePrescribingService');
const Patient = require('../models/Patient');

exports.createPrescription = async (req, res) => {
    try {
        const doctorId = req.user ? req.user.id : null;
        if (!doctorId) {
            return res.status(401).json({ success: false, message: 'Authentication required.' });
        }

        const {
            patientId,
            medicationName,
            dosage,
            instructions,
            refills,
            pharmacyPreference
        } = req.body;

        if (!patientId || !medicationName || !dosage) {
            return res.status(400).json({ success: false, message: 'Missing required fields for prescription.' });
        }

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

        let ePrescribeResult;
        try {
            ePrescribeResult = await ePrescribingService.sendToPharmacy(newPrescription, pharmacyPreference);
        } catch (err) {
            console.error('Error sending prescription to pharmacy:', err);
            return res.status(500).json({
                success: false,
                message: 'Prescription created but failed to send electronically.',
                prescription: newPrescription
            });
        }

        res.status(201).json({
            success: true,
            message: 'Prescription issued and electronically sent to the pharmacy.',
            prescription: newPrescription,
            ePrescribeStatus: ePrescribeResult.status
        });

    } catch (error) {
        console.error('Error creating prescription:', error);
        res.status(500).json({ success: false, message: 'Server error: Failed to create or send prescription.' });
    }
};

exports.createReferral = async (req, res) => {
    try {
        const doctorId = req.user ? req.user.id : null;
        if (!doctorId) {
            return res.status(401).json({ success: false, message: 'Authentication required.' });
        }

        const {
            patientId,
            specialistType,
            reason,
            referralCenterName
        } = req.body;

        if (!patientId || !specialistType || !reason) {
            return res.status(400).json({ success: false, message: 'Missing required fields for referral.' });
        }

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
        res.status(500).json({ success: false, message: 'Server error: Failed to create referral.' });
    }
};