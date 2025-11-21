
const MedicalHistory = require('../models/MedicalHistory'); 
const LabReport = require('../models/LabReport');
const Prescription = require('../models/Prescription'); 
const Patient = require('../models/Patient'); 


exports.getPatientEHR = async (req, res) => {
    try {
        const { patientId } = req.params;
        const requestingDoctorId = req.user.id;

        const isAuthorized = await Patient.checkDoctorAccess(patientId, requestingDoctorId);
        if (!isAuthorized) {
            return res.status(403).json({ message: 'Access denied. Doctor is not authorized for this patient.' });
        }

        const medicalHistory = await MedicalHistory.findOne({ patient: patientId });
        const labReports = await LabReport.find({ patient: patientId }).sort({ date: -1 });
        const prescriptions = await Prescription.find({ patient: patientId, isActive: true }).sort({ date: -1 });
        
        if (!medicalHistory) {
            return res.status(404).json({ message: 'Patient EHR not found.' });
        }

        res.status(200).json({
            success: true,
            data: {
                patientId,
                medicalHistory: medicalHistory,
                labReports: labReports, 
                prescriptions: prescriptions, 
            }
        });
    } catch (error) {
        console.error('Error fetching patient EHR:', error);
        res.status(500).json({ message: 'Server error retrieving health record.' });
    }
};

exports.updateMedicalHistory = async (req, res) => {
    try {
        const { patientId } = req.params;
        const { newAllergies, updatedMedications, updatedTreatmentPlan } = req.body;
        const requestingDoctorId = req.user.id;
        const isAuthorized = await Patient.checkDoctorAccess(patientId, requestingDoctorId);
        if (!isAuthorized) {
            return res.status(403).json({ message: 'Access denied.' });
        }

        const updatedHistory = await MedicalHistory.findOneAndUpdate(
            { patient: patientId },
            { 
                $set: { 
                    allergies: newAllergies,
                    medications: updatedMedications,
                    treatmentPlan: updatedTreatmentPlan 
                }
            },
            { new: true, upsert: true }
        );
        res.status(200).json({
            success: true,
            message: 'Medical history updated successfully.',
            data: updatedHistory
        });

    } catch (error) {
        console.error('Error updating medical history:', error);
        res.status(500).json({
            success: false,
            message: 'error updating medical history.',
            error: error.messge,
        });
    }
};