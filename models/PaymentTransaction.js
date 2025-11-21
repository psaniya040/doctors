
const mongoose = require('mongoose');

const paymentTransactionSchema = new mongoose.Schema({
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: [true, 'Transaction must be linked to an appointment.']
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    
    amount: {
        type: Number,
        required: [true, 'Transaction amount is required.']
    },
    currency: {
        type: String,
        default: 'USD', 
        required: true
    },
    
    transactionStatus: {
        type: String,
        enum: ['pending', 'succeeded', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required.'],
        enum: ['credit_card', 'debit_card', 'digital_wallet', 'insurance'] 
    },
    paymentGateway: {
        type: String,
        enum: ['Stripe', 'PayPal', 'Other'], 
        required: true
    },
    gatewayTransactionId: {
        type: String,
        unique: true, 
        sparse: true 
    },
    failureReason: {
        type: String
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('PaymentTransaction', paymentTransactionSchema);