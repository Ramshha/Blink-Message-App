import React from 'react';
import './ViewNote.css';

const Frame = ({ isOpen, onClose, fileURL }) => {
  if (!isOpen) return null;

  return (
    <div className="frame-overlay">
      <div className="frame-content">
        <button className="frame-close" onClick={onClose}>X</button>
        <iframe 
          src={fileURL} 
          style={{ width: '100vh', height: '80vh' }} 
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}

export default Frame;
