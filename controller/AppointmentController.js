
const AppointmentModel = require('../models/AppointmentModel');
const DoctorModel = require('../models/DoctorModel');
const NotificationService = require('../services/NotificationService');
const validateAppointmentData = require('../utils/validation');

exports.getDoctorAvailability = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { startDate, endDate } = req.query;

        if (!doctorId || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "Missing doctor ID or date range."
            });
        }

        const availableSlots = await DoctorModel.getAvailableSlots(doctorId, startDate, endDate);

        res.status(200).json({
            success: true,
            data: availableSlots
        });

    } catch (error) {
        console.error(`Error fetching availability for doctor ${req.params.doctorId}:`, error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve doctor availability."
        });
    }
};


exports.scheduleAppointment = async (req, res) => {
    const patientId = req.user ? req.user.id : null;
    const appointmentData = {
        patientId,
        ...req.body,
    };

    if (!patientId) {
        return res.status(401).json({ success: false, message: "Authentication required to book an appointment." });
    }

    const validationErrors = validateAppointmentData(appointmentData);
    if (validationErrors) {
        return res.status(400).json({ success: false, message: validationErrors });
    }

    try {
        const isSlotAvailable = await DoctorModel.isSlotOpen(
            appointmentData.doctorId,
            appointmentData.startTime,
            appointmentData.endTime
        );

        if (!isSlotAvailable) {
            return res.status(409).json({ success: false, message: "The selected time slot is no longer available. Please choose another." });
        }

        const newAppointment = await AppointmentModel.create(appointmentData);

        await NotificationService.sendAppointmentConfirmation(newAppointment.id, patientId, appointmentData.doctorId);
        await NotificationService.scheduleReminder(newAppointment.id, appointmentData.startTime, patientId);

        res.status(201).json({
            success: true,
            message: "Appointment successfully scheduled.",
            data: {
                appointmentId: newAppointment.id,
                confirmation: true
            }
        });

    } catch (error) {
        console.error("Error scheduling appointment:", error);
        res.status(500).json({ success: false, message: "An unexpected error occurred during scheduling." });
    }
};


exports.cancelAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const userId = req.user ? req.user.id : null;
    const userRole = req.user ? req.user.role : null;

    if (!userId) {
        return res.status(401).json({ success: false, message: "Authentication required." });
    }

    try {
        const appointment = await AppointmentModel.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found." });
        }

        const isAuthorized = appointment.patientId === userId || appointment.doctorId === userId || userRole === 'admin';
        if (!isAuthorized) {
            return res.status(403).json({ success: false, message: "Not authorized to cancel this appointment." });
        }

        const timeDiff = new Date(appointment.startTime) - Date.now();
        if (timeDiff < 2 * 3600 * 1000) {
            return res.status(400).json({ success: false, message: "Cancellation not allowed within 2 hours of the appointment time." });
        }

        const updatedAppt = await AppointmentModel.updateStatus(appointmentId, 'CANCELED');

        await NotificationService.sendCancellationNotification(updatedAppt.id, updatedAppt.patientId, updatedAppt.doctorId);

        res.status(200).json({ success: true, message: "Appointment successfully cancelled." });

    } catch (error) {
        console.error(`Error cancelling appointment ${appointmentId}:`, error);
        res.status(500).json({ success: false, message: "Failed to cancel appointment." });
    }
};


exports.getAppointments = async (req, res) => {
    const userId = req.user ? req.user.id : null;
    const userRole = req.user ? req.user.role : null;
    const status = req.query.status || 'upcoming';

    if (!userId) {
        return res.status(401).json({ success: false, message: "Authentication required." });
    }

    try {
        const appointments = await AppointmentModel.getAppointmentsByUserId(userId, userRole, status);

        res.status(200).json({
            success: true,
            data: appointments
        });

    } catch (error) {
        console.error(`Error retrieving appointments for user ${userId}:`, error);
        res.status(500).json({ success: false, message: "Failed to retrieve appointments." });
    }
};