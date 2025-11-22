
const MedicalHistory = require('../models/MedicalHistory');
const LabReport = require('../models/LabReport');
const Prescription = require('../models/Prescription');
const Patient = require('../models/Patient');

exports.getPatientEHR = async (req, res) => {
    try {
        const { patientId } = req.params;
        const requestingDoctorId = req.user ? req.user.id : null;

        if (!requestingDoctorId) {
            return res.status(401).json({ success: false, message: 'Authentication required.' });
        }

        const isAuthorized = await Patient.checkDoctorAccess(patientId, requestingDoctorId);
        if (!isAuthorized) {
            return res.status(403).json({ success: false, message: 'Access denied. Doctor is not authorized for this patient.' });
        }

        const medicalHistory = await MedicalHistory.findOne({ patient: patientId });
        const labReports = await LabReport.find({ patient: patientId }).sort({ date: -1 });
        const prescriptions = await Prescription.find({ patient: patientId, isActive: true }).sort({ date: -1 });

        if (!medicalHistory && labReports.length === 0 && prescriptions.length === 0) {
            return res.status(404).json({ success: false, message: 'Patient EHR not found.' });
        }

        res.status(200).json({
            success: true,
            data: {
                patientId,
                medicalHistory,
                labReports,
                prescriptions,
            }
        });
    } catch (error) {
        console.error('Error fetching patient EHR:', error);
        res.status(500).json({ success: false, message: 'Server error retrieving health record.' });
    }
};

exports.updateMedicalHistory = async (req, res) => {
    try {
        const { patientId } = req.params;
        const { newAllergies, updatedMedications, updatedTreatmentPlan } = req.body;
        const requestingDoctorId = req.user ? req.user.id : null;

        if (!requestingDoctorId) {
            return res.status(401).json({ success: false, message: 'Authentication required.' });
        }

        const isAuthorized = await Patient.checkDoctorAccess(patientId, requestingDoctorId);
        if (!isAuthorized) {
            return res.status(403).json({ success: false, message: 'Access denied.' });
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
            message: 'Error updating medical history.',
            error: error.message,
        });
    }
};