
const Patient = require('../models/Patient'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret'; 


exports.registerPatient = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        let patient = await Patient.findOne({ email });
        if (patient) {
            return res.status(400).json({ message: 'Patient with this email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        patient = await Patient.create({
            name,
            email,
            phone,
            password: hashedPassword 
        });


        const token = jwt.sign({ id: patient._id }, JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({
            success: true,
            message: 'Registration successful.',
            token,
            data: { id: patient._id, name: patient.name, email: patient.email }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const patientId = req.user.id;
        const { personalDetails, medicalHistory, allergies, medications, insuranceInfo } = req.body;
        
        const updateFields = {
            ...personalDetails,
            medicalHistory,
            allergies,
            medications,
            insuranceInfo
        };

        const patient = await Patient.findByIdAndUpdate(patientId, updateFields, { 
            new: true, 
            runValidators: true,
            select: '-password' 
        });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully.',
            data: patient
        });

    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: 'Server error during profile update.' });
    }
};


exports.uploadDocument = async (req, res) => {
    try {
        const patientId = req.user.id;
        const fileData = req.file;

        if (!fileData) {
             return res.status(400).json({ message: 'No file uploaded.' });
        }

        const updatedPatient = await Patient.findByIdAndUpdate(
            patientId,
            { $push: { documents: { name: fileData.originalname, url: fileData.path } } }, 
            { new: true, select: 'documents' }
        );

        res.status(200).json({
            success: true,
            message: 'Document uploaded successfully.',
            data: updatedPatient.documents
        });

    } catch (error) {
        console.error('Document upload error:', error);
        res.status(500).json({ message: 'Server error during document upload.' });
    }
};