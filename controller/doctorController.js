
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

exports.getDoctors = async (req, res) => {
    try {
        // Adjust filter key to match schema (specialty vs specialties)
        const filter = req.query.specialty ? { specialties: req.query.specialty } : {};

        const doctors = await Doctor.find(filter)
            .select('name specialties qualifications experience averageRating totalReviews availability');

        res.status(200).json({
            success: true,
            count: doctors.length,
            data: doctors
        });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching doctors.' });
    }
};

exports.getDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('reviews');

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found.' });
        }

        res.status(200).json({
            success: true,
            data: doctor
        });
    } catch (error) {
        console.error('Error fetching doctor profile:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching doctor profile.' });
    }
};

exports.scheduleAppointment = async (req, res) => {
    try {
        const { date, time, reason } = req.body;
        const doctorId = req.params.id;
        const patientId = req.user ? req.user.id : null;

        if (!patientId) {
            return res.status(401).json({ success: false, message: 'Authentication required to schedule appointment.' });
        }

        const isAvailable = await Doctor.checkAvailability(doctorId, date, time);

        if (!isAvailable) {
            return res.status(400).json({ success: false, message: 'The selected slot is no longer available.' });
        }

        const appointment = await Appointment.create({
            patient: patientId,
            doctor: doctorId,
            date,
            time,
            reason,
            status: 'Pending'
        });

        res.status(201).json({
            success: true,
            message: 'Appointment scheduled successfully. Confirmation sent via Email/SMS.',
            data: appointment
        });
    } catch (error) {
        console.error('Error scheduling appointment:', error);
        res.status(500).json({ success: false, message: 'Server error while scheduling appointment.' });
    }
};