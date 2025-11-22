const Appointment = require('../models/Appointment');
const PaymentTransaction = require('../models/PaymentTransaction');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const processPayment = async (req, res) => {
    const patientId = req.user ? req.user.id : null;

    if (!patientId) {
        return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    try {
        const { appointmentId, paymentMethodId, amount, currency } = req.body;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment || appointment.patient.toString() !== patientId) {
            return res.status(404).json({ success: false, message: 'Appointment not found or unauthorized.' });
        }

        if (appointment.paymentStatus === 'paid') {
            return res.status(400).json({ success: false, message: 'Appointment already paid.' });
        }

        // Create transaction record
        let transaction = await PaymentTransaction.create({
            appointment: appointmentId,
            patient: patientId,
            amount,
            currency,
            paymentMethod: 'credit_card',
            paymentGateway: 'Stripe',
            transactionStatus: 'pending'
        });

        // Create Stripe PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe expects smallest currency unit
            currency,
            payment_method: paymentMethodId,
            confirmation_method: 'manual',
            confirm: true,
            description: `Payment for appointment ${appointmentId}`,
        });

        if (paymentIntent.status === 'succeeded') {
            await PaymentTransaction.updateOne(
                { _id: transaction._id },
                {
                    transactionStatus: 'succeeded',
                    gatewayTransactionId: paymentIntent.id
                }
            );

            await Appointment.updateOne(
                { _id: appointmentId },
                { paymentStatus: 'paid' }
            );

            return res.status(200).json({
                success: true,
                message: 'Payment succeeded and billing automated.',
                transactionId: paymentIntent.id,
            });
        } else {
            await PaymentTransaction.updateOne(
                { _id: transaction._id },
                {
                    transactionStatus: 'failed',
                    gatewayTransactionId: paymentIntent.id,
                    failureReason: paymentIntent.last_payment_error?.message || 'Unknown error'
                }
            );

            return res.status(400).json({
                success: false,
                message: 'Payment failed.',
                error: paymentIntent.last_payment_error || 'Unknown error'
            });
        }

    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ success: false, message: 'Server error during payment processing.' });
    }
};

module.exports = {
    processPayment,
};