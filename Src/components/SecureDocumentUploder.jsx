
import React, { useState } from 'react';
import { FaUpload, FaFilePdf, FaFileImage, FaLock } from 'react-icons/fa';

const SecureDocumentUploader = ({ userId }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
            setSelectedFile(file);
        } else {
            alert('Please select a PDF or image file.');
            setSelectedFile(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('userId', userId);
        
        try {
            const response = await fetch('/api/secure/upload-document', {
                method: 'POST',
                body: formData,
            
            });

            if (response.ok) {
                alert(`File ${selectedFile.name} uploaded successfully and securely!`);
                setSelectedFile(null);
            } else {
                throw new Error('Upload failed.');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            alert('File upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const getFileIcon = (file) => {
        if (!file) return null;
        if (file.type === 'application/pdf') return <FaFilePdf className="text-danger me-2" size={24} />;
        if (file.type.startsWith('image/')) return <FaFileImage className="text-success me-2" size={24} />;
        return null;
    };

    return (
        <div className="card p-4 shadow-sm">
            <h5 className="card-title mb-3">
                <FaLock className="me-2 text-info" /> Secure Document Uploader
            </h5>
            <p className="small text-muted mb-3">
                Upload your ID, Insurance Card, or recent lab reports (Max 5MB, PDF/Image only). All files are encrypted.
            </p>
            
            <input 
                type="file" 
                accept=".pdf, .png, .jpg, .jpeg"
                onChange={handleFileChange} 
                className="form-control mb-3"
                disabled={uploading}
            />

            {selectedFile && (
                <div className="alert alert-light d-flex align-items-center">
                    {getFileIcon(selectedFile)}
                    <span className="me-auto">{selectedFile.name}</span>
                    <span className="badge bg-secondary ms-2">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
            )}

            <button 
                className="btn btn-info w-100" 
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
            >
                {uploading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                        Uploading...
                    </>
                ) : (
                    <>
                        <FaUpload className="me-2" /> Upload Document
                    </>
                )}
            </button>
        </div>
    );
};

export default SecureDocumentUploader;