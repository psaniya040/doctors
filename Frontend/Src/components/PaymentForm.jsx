
import React, { useState } from 'react';

const PaymentForm = ({ consultationFee }) => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
    
        console.log(`Processing ${consultationFee} using ${paymentMethod}...`);
        
    
        alert(`Payment of ${consultationFee} successfully processed!`);
        
    };

    return (
        <div className="card shadow p-4 my-5 payment-form">
            <h2 className="card-title text-warning mb-4">
                <i className="bi bi-credit-card me-2"></i> 
                Payment Processing
            </h2>
            <form onSubmit={handlePaymentSubmit}>
                <div className="alert alert-info text-center">
                    **Consultation Fee: ${consultationFee.toFixed(2)}**
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Select Payment Method</label>
                    <div className="d-flex gap-3">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="paymentMethod" id="creditCard" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                            <label className="form-check-label" htmlFor="creditCard">
                                Credit/Debit Card
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="paymentMethod" id="digitalWallet" value="wallet" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} />
                            <label className="form-check-label" htmlFor="digitalWallet">
                                Digital Wallet (PayPal/Others)
                            </label>
                        </div>
                    </div>
                </div>

                {paymentMethod === 'card' && (
                    <div className="card p-3 mb-4 bg-light">
                        <h5 className="h6">Enter Card Details</h5>
                        <input type="text" placeholder="Card Number" className="form-control mb-2" required />
                        <div className="row">
                            <div className="col-6"><input type="text" placeholder="MM/YY" className="form-control" required /></div>
                            <div className="col-6"><input type="text" placeholder="CVV" className="form-control" required /></div>
                        </div>
                    </div>
                )}
                
                {paymentMethod === 'wallet' && (
                    <div className="alert alert-secondary">
                        [span_9](start_span)Redirecting to Digital Wallet provider for secure payment (supports multiple payment methods)[span_9](end_span).
                    </div>
                )}
                
                <button type="submit" className="btn btn-warning w-100">
                    Pay Now - ${consultationFee.toFixed(2)}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;