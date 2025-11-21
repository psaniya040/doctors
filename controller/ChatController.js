
const Chat = require('../models/Chat'); 
const socketManager = require('../utils/socketManager'); 

exports.getChatHistory = async (req, res) => {
    try {
        const { chatId } = req.params;
        const messages = await Chat.find({ chatId })
            .sort({ timestamp: 1 })
            .limit(100)
            .populate('sender', 'name profilePicture'); 

        if (!messages || messages.length === 0) {
            return res.status(404).json({ message: 'Chat not found.' });
        }

        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });

    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.startNewChat = async (req, res) => {
    try {
        
        const { doctorId } = req.body;
        const patientId = req.user.id; 

        
        let chat = await Chat.findOne({ participants: { $all: [patientId, doctorId] } });

        if (!chat) {
            
            chat = await Chat.create({ 
                participants: [patientId, doctorId],
                
            });
        }
        
        res.status(201).json({
            success: true,
            message: 'Chat thread created or fetched.',
            data: chat
        });

    } catch (error) {
        console.error('Error starting new chat:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

