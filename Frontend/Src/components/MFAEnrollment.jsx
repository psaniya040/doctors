
import React, { useState } from 'react';
import { FaShieldAlt, FaQrcode } from 'react-icons/fa';

const MFAEnrollment = () => {
    const [step, setStep] = useState(1);
    const [qrCodeData, setQrCodeData] = useState('otpauth://totp/OnlineClinic:user@example.com?secret=JBSWY3DPEHPK3PXP');
    

    return (
        <div className="card shadow-sm p-4 bg-light">
            <h5 className="text-primary mb-3"><FaShieldAlt className="me-2" /> Enable Two-Factor Authentication</h5>
            
            {step === 1 && (
                <>
                    <p>MFA adds an extra layer of security. Please choose your method.</p>
                    <button className="btn btn-warning w-100 mb-2" onClick={() => setStep(2)}>
                        Use Authenticator App (Recommended)
                    </button>
                    <button className="btn btn-outline-secondary w-100">
                        Use SMS/Email OTP
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <p className="fw-bold">Step 2: Scan QR Code</p>
                    <div className="text-center p-3 border border-dark rounded bg-white mb-3">
                        {}
                        <FaQrcode size={100} className="text-secondary" />
                        <p className="small mt-2">Scan this code with Google Authenticator or Authy.</p>
                    </div>
                    
                    <label className="form-label">Enter Verification Code</label>
                    <input type="text" className="form-control mb-3" placeholder="6-digit code" maxLength="6" required />
                    <button className="btn btn-success w-100" onClick={() => setStep(3)}>
                        Verify & Enable MFA
                    </button>
                </>
            )}

            {step === 3 && (
                <div className="alert alert-success">
                    MFA is now **Enabled**! Your account is highly secure.
                </div>
            )}
        </div>
    );
};

export default MFAEnrollment;