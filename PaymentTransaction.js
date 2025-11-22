
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
    required: [true, 'Transaction amount is required.'],
    min: [0, 'Amount must be positive']
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'INR', 'GBP'], // restrict to ISO codes
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
    sparse: true // allows multiple nulls
  },
  failureReason: {
    type: String,
    maxlength: 500 // prevent overly long error messages
  }
}, {
  timestamps: true
});

// Helpful indexes for faster queries
paymentTransactionSchema.index({ appointment: 1 });
paymentTransactionSchema.index({ patient: 1 });
paymentTransactionSchema.index({ transactionStatus: 1 });

module.exports = mongoose.model('PaymentTransaction', paymentTransactionSchema);