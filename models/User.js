

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required.']
    },
    password: {
        type: String, 
        required: [true, 'Password is required.']
    },
    
    role: {
        type: String,
        enum: ['Patient', 'Doctor', 'Admin'], 
        required: [true, 'User role is required.']
    },
    
    
    profileId: {
        
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'role' 
    },
    
    
    isVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);