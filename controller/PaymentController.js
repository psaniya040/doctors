const Appointment = require('../models/Appointment');
const PaymentTransaction = require('../models/PaymentTransaction');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 


const processPayment = async (req, res) => {
    const patientId = req.user ? req.user.id : 'MOCK_PATIENT_ID'; 

    try {
        const { appointmentId, paymentMethodId, amount, currency } = req.body;
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment || appointment.patient.toString() !== patientId) {
            return res.status(404).json({ message: 'Appointment not found or unauthorized.' });
        }
        if (appointment.paymentStatus === 'paid') {
            return res.status(400).json({ message: 'Appointment already paid.' });
        }
        
        let transaction = await PaymentTransaction.create({
            appointment: appointmentId,
            patient: patientId,
            amount: amount,
            currency: currency,
            paymentMethod: 'credit_card', 
            paymentGateway: 'Stripe',
            transactionStatus: 'pending'
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), 
            currency: currency,
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
                { transactionStatus: 'failed', failureReason: paymentIntent.last_payment_error?.message }
            );
            return res.status(400).json({ message: 'Payment failed.', error: paymentIntent.last_payment_error });
        }

    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ message: 'Server error during payment processing.' });
    }
};

module.exports = {
    processPayment,
};
