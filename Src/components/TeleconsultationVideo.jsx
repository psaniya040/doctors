
import React, { useState, useEffect } from 'react';
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaPhoneSlash, FaFileMedical } from 'react-icons/fa';

const TeleconsultationVideo = ({ roomId, patientId, doctorId }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isCallActive, setIsCallActive] = useState(true);

    useEffect(() => {
        
        if (isCallActive) {
            console.log(`Starting video session for Room: ${roomId}`);
            
        }
        return () => {
            
            console.log(`Ending video session for Room: ${roomId}`);
        };
    }, [roomId, isCallActive]);

    if (!isCallActive) {
        return (
            <div className="alert alert-danger text-center">
                <h5 className="mb-0">Call Ended</h5>
                <p className="small mb-0">Thank you for your consultation.</p>
            </div>
        );
    }

    return (
        <div className="card video-consultation shadow-lg border-0" style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
            {}
            <div className="card-body p-0 flex-grow-1 position-relative bg-dark">
                {}
                <div className="video-feed-main h-100 w-100 bg-secondary text-white d-flex align-items-center justify-content-center">
                    {}
                    <h4 className="text-center">Doctor's Stream (Secure)</h4>
                </div>
                
                {}
                <div className="video-feed-self position-absolute top-0 end-0 m-3 border border-5 border-light bg-primary text-white d-flex align-items-center justify-content-center rounded" style={{ width: '150px', height: '100px', zIndex: 10 }}>
                    {isVideoOff ? 'Video Off' : 'Your Video'}
                </div>
            </div>

            {}
            <div className="card-footer bg-light p-3">
                <div className="d-flex justify-content-center gap-4">
                    
                    {}
                    <button 
                        className={`btn btn-lg ${isMuted ? 'btn-danger' : 'btn-outline-secondary'}`} 
                        onClick={() => setIsMuted(!isMuted)}
                        title={isMuted ? 'Unmute' : 'Mute'}
                    >
                        {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                    </button>
                    
                    {}
                    <button 
                        className={`btn btn-lg ${isVideoOff ? 'btn-danger' : 'btn-outline-secondary'}`} 
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        title={isVideoOff ? 'Turn Video On' : 'Turn Video Off'}
                    >
                        {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
                    </button>
                    
                    {}
                    <button 
                        className="btn btn-lg btn-danger" 
                        onClick={() => setIsCallActive(false)}
                        title="End Call"
                    >
                        <FaPhoneSlash />
                    </button>

                    {}
                    <button 
                        className="btn btn-lg btn-info d-none d-md-block" 
                        title="Access Patient EHR"
                    >
                        <FaFileMedical /> EHR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeleconsultationVideo;