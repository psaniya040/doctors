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
        required: true,
        refPath: 'senderModel' // dynamically reference Patient or Doctor
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['Patient', 'Doctor']
    },
    content: {
        type: String,
        trim: true
    },
    fileUrl: {
        type: String,
        default: null
    },
    fileType: {
        type: String,
        enum: ['image', 'document'],
        default: null
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Optional: ensure either content or fileUrl exists
chatSchema.pre('save', function (next) {
    if (!this.content && !this.fileUrl) {
        return next(new Error('A chat message must have either content or a file.'));
    }
    next();
});

module.exports = mongoose.model('Chat', chatSchema);