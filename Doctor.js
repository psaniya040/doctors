const router = require('express').Router();
const Doctor = require('../models/Doctor');

// Create a new doctor profile
router.post('/', async (req, res) => {
    const { name, specialty, qualifications, experience, email } = req.body;

    if (!name || !specialty || !qualifications) {
        return res.status(400).json({ success: false, message: 'Name, specialty, and qualifications are required.' });
    }

    try {
        const doctor = await Doctor.create({
            name,
            specialty,
            qualifications,
            experience,
            email
        });

        res.status(201).json({
            success: true,
            message: 'Doctor profile created successfully.',
            data: doctor
        });
    } catch (error) {
        console.error('Doctor Profile Save Error:', error);
        res.status(500).json({ success: false, message: 'Failed to save doctor profile.' });
    }
});

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find().select('name specialty qualifications experience avg_rating email');

        res.status(200).json({
            success: true,
            count: doctors.length,
            data: doctors
        });
    } catch (error) {
        console.error('Fetch Doctors Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch doctor list.' });
    }
});

module.exports = router;