
const Chat = require('../models/Chat');
const socketManager = require('../utils/socketManager');

exports.getChatHistory = async (req, res) => {
    try {
        const { chatId } = req.params;

        if (!chatId) {
            return res.status(400).json({ success: false, message: 'Chat ID is required.' });
        }

        const chat = await Chat.findById(chatId)
            .populate({
                path: 'messages',
                options: { sort: { timestamp: 1 }, limit: 100 },
                populate: { path: 'sender', select: 'name profilePicture' }
            });

        if (!chat || !chat.messages || chat.messages.length === 0) {
            return res.status(404).json({ success: false, message: 'Chat not found or has no messages.' });
        }

        res.status(200).json({
            success: true,
            count: chat.messages.length,
            data: chat.messages
        });

    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching chat history.' });
    }
};

exports.startNewChat = async (req, res) => {
    try {
        const { doctorId } = req.body;
        const patientId = req.user ? req.user.id : null;

        if (!patientId || !doctorId) {
            return res.status(400).json({ success: false, message: 'Doctor ID and authenticated patient required.' });
        }

        let chat = await Chat.findOne({ participants: { $all: [patientId, doctorId] } });

        if (!chat) {
            chat = await Chat.create({
                participants: [patientId, doctorId],
                messages: []
            });

            // Optionally notify via socket
            socketManager.emitToUser(doctorId, 'newChat', { chatId: chat._id, patientId });
        }

        res.status(201).json({
            success: true,
            message: 'Chat thread created or fetched.',
            data: chat
        });

    } catch (error) {
        console.error('Error starting new chat:', error);
        res.status(500).json({ success: false, message: 'Server error while starting chat.' });
    }
};