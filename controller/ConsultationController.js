

const Appointment = require('../models/Appointment'); 
const mockCreateSecureRoom = (appointmentId, userId) => {
    return {
        roomId: `room-${appointmentId}`,
        token: `mock_jwt_video_token_for_${userId}`,
        url: `https://mock-video-service.com/join/${appointmentId}`,
    };
};

const startConsultation = async (req, res) => {
    const { appointmentId } = req.params;
    const userId = req.user ? req.user.id : 'MOCK_USER_ID'; 

    try {
        const appointment = await Appointment.findById(appointmentId).populate('doctor patient');
        
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        const isParticipant = appointment.doctor._id.toString() === userId || appointment.patient._id.toString() === userId;
        if (!isParticipant) {
            return res.status(403).json({ message: 'Not authorized to start this consultation.' });
        }
        
        
        const videoRoomDetails = mockCreateSecureRoom(appointmentId, userId); 

        appointment.status = 'active';
        await appointment.save();

        res.status(200).json({
            success: true,
            message: 'Consultation session ready. Join link provided.',
            videoRoom: videoRoomDetails,
        });

    } catch (error) {
        console.error('Error starting consultation:', error);
        res.status(500).json({ message: 'Server error while initiating consultation.' });
    }
};

const endConsultation = async (req, res) => {
    const { appointmentId } = req.params;
    const doctorId = req.user ? req.user.id : 'MOCK_DOCTOR_ID'; 

    try {

        const appointment = await Appointment.findById(appointmentId);
        
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }
        
        if (appointment.doctor.toString() !== doctorId) {
            return res.status(403).json({ message: 'Only the consulting doctor can end this session.' });
        }

        appointment.status = 'completed';
        appointment.endTime = new Date();
        await appointment.save();

        res.status(200).json({
            success: true,
            message: 'Consultation completed and closed.',
            appointment: appointment,
        });

    } catch (error) {
        console.error('Error ending consultation:', error);
        res.status(500).json({ message: 'Server error while ending consultation.' });
    }
};


const getChatSetup = async (req, res) => {
    const { appointmentId } = req.params;
    
    try {
        
        res.status(200).json({ 
            success: true,
            message: 'Real-time chat initiated.',
            chatProtocol: 'Socket.IO', 
            features: ['Real-time text messaging', 'Multimedia file sharing support']
        });
        
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ message: 'Server error while setting up chat.' });
    }
};

module.exports = {
    startConsultation,
    endConsultation,
    getChatSetup,
};