// models/Chat.js

const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true,
        index: true 
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['Patient', 'Doctor']
    },
    
    content: {
        type: String,
        trim: true,
        
    },

    fileUrl: {
        type: String,
        default: null 
    },
    fileType: {
        type: String,
        enum: ['image', 'document', null], 
        default: null
    },
    
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Chat', chatSchema);