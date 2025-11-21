
const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: [true, 'Prescription must be linked to a patient.']
    },
    prescribingDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'Prescription must be linked to a prescribing doctor.']
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: [true, 'Prescription must be linked to the consultation.']
    },
    
    medications: [{
        name: {
            type: String,
            required: [true, 'Medication name is required.']
        },
        dosage: {
            type: String,
            required: [true, 'Dosage is required (e.g., "500mg").']
        },
        frequency: {
            type: String,
            required: [true, 'Frequency is required (e.g., "Twice daily").']
        },
        duration: {
            type: String,
            required: [true, 'Duration is required (e.g., "7 days").']
        },
        quantity: { 
            type: Number,
            required: true
        },
        instructions: {
            type: String,
            default: 'Take as directed.'
        },
    }],
    
    
    notes: { 
        type: String
    },
    dispensingPharmacy: { 
        type: String,
        default: 'Not yet selected'
    },
    
    fulfillmentStatus: {
        type: String,
        enum: ['pending', 'sent_to_pharmacy', 'filled', 'rejected'],
        default: 'pending'
    },
    

    isDigitallySigned: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Prescription', prescriptionSchema);