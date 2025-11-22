
const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    day: { 
        type: String, 
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], 
        required: true 
    },
    startTime: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // HH:MM format
            },
            message: props => `${props.value} is not a valid time format (HH:MM)`
        }
    },
    endTime: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: props => `${props.value} is not a valid time format (HH:MM)`
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Availability', availabilitySchema);