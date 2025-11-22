
import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaTimesCircle, FaLink } from 'react-icons/fa';

const initialMessages = [
    { id: 1, sender: 'Doctor', text: "Hello! I'm reviewing your file now. How can I help you today?", time: '10:00 AM' },
    { id: 2, sender: 'Patient', text: "Thank you, doctor. I have some persistent symptoms I wanted to discuss.", time: '10:01 AM' },
];

const SecureChatModule = ({ appointmentId, patientName, doctorName }) => {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (input.trim() === '') return;

        const newMessage = {
            id: Date.now(),
            sender: 'Patient', 
            text: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        
        setMessages([...messages, newMessage]);
        setInput('');
    };

    const isPatient = (sender) => sender === 'Patient';

    return (
        <div className="card chat-module shadow-sm" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <span className="fw-bold">
                    <FaLink className="me-2" /> Chat with Dr. {doctorName}
                </span>
                <button className="btn btn-sm btn-outline-light"><FaTimesCircle /></button>
            </div>

            {}
            <div className="card-body overflow-auto flex-grow-1 p-3">
                {messages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={`d-flex ${isPatient(msg.sender) ? 'justify-content-end' : 'justify-content-start'} mb-2`}
                    >
                        <div className={`message p-2 rounded ${isPatient(msg.sender) ? 'bg-info text-white' : 'bg-light text-dark'}`} style={{ maxWidth: '75%' }}>
                            <div className="small fw-bold mb-1">{msg.sender}</div>
                            {msg.text}
                            <div className="text-end small mt-1" style={{ fontSize: '0.65rem', opacity: 0.7 }}>{msg.time}</div>
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {}
            <div className="card-footer d-flex p-3">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Type your secure message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    disabled={!appointmentId}
                />
                <button className="btn btn-primary" onClick={handleSend} disabled={!appointmentId || input.trim() === ''}>
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
};

export default SecureChatModule;