
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PatientModel = require('../models/PatientModel');
const DoctorModel = require('../models/DoctorModel'); 
const { validateRegistrationData, validateLoginData } = require('../utils/validation');  // ✅ fixed import

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';
const TOKEN_EXPIRY = '1h';

exports.registerPatient = async (req, res) => {
    const registrationData = req.body;
    const validationErrors = validateRegistrationData(registrationData);
    
    if (validationErrors) {
        return res.status(400).json({ success: false, message: "Validation failed.", errors: validationErrors });
    }

    try {
        const existingUser = await PatientModel.findByEmail(registrationData.email);
        if (existingUser) {
            return res.status(409).json({ success: false, message: "A user with this email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(registrationData.password, salt);

        const newPatientData = {
            ...registrationData,
            password: hashedPassword,
            role: 'patient', 
        };

        const newPatient = await PatientModel.create(newPatientData);

        const payload = { userId: newPatient.id, role: newPatient.role };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

        res.status(201).json({
            success: true,
            message: "Patient registration successful.",
            token,
            user: {
                id: newPatient.id,
                name: newPatient.name,
                email: newPatient.email,
                role: newPatient.role,
            }
        });

    } catch (error) {
        console.error("Error during patient registration:", error);
        res.status(500).json({ success: false, message: "An unexpected error occurred during registration." });
    }
};


exports.login = async (req, res) => {
    const { email, password, role } = req.body;
    const validationErrors = validateLoginData(req.body);

    if (validationErrors) {
        return res.status(400).json({ success: false, message: "Validation failed.", errors: validationErrors });
    }

    try {
        const userModel = role === 'doctor' ? DoctorModel : PatientModel;
        const user = await userModel.findByEmail(email);

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials (User not found)." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials (Password mismatch)." });
        }

        const payload = { userId: user.id, role: user.role };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "An unexpected error occurred during login." });
    }
};


exports.updateProfile = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Authentication required." });
    }

    const userId = req.user.userId; 
    const role = req.user.role;
    const updates = { ...req.body };

    // Prevent sensitive fields from being updated
    delete updates.email;
    delete updates.password;
    delete updates.role;

    try {
        let userModel;
        if (role === 'doctor') {
            userModel = DoctorModel;
        } else if (role === 'patient') {
            userModel = PatientModel;
        } else {
            return res.status(403).json({ success: false, message: "Unauthorized role for profile update." });
        }

        const updatedUser = await userModel.update(userId, updates);

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: `${role} profile not found.` });
        }

        res.status(200).json({ 
            success: true, 
            message: `${role} profile updated successfully.`,
            data: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role }
        });

    } catch (error) {
        console.error(`Error updating ${role} profile for user ${userId}:`, error);
        res.status(500).json({ success: false, message: "Failed to update profile." });
    }
};