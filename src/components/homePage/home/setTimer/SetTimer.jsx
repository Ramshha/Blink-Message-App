import React from 'react'
import '../Home.css'

const SetTimer = ({ timer, handleChange }) => {
  
  return (
    <>
        <div className="setTimer">
            <label htmlFor="timer">Note View Time:</label>
            <select id="timer" name="timer" value={timer} onChange={handleChange}>
                <option value={10}>10 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>60 seconds</option>
            </select>
        </div>
    </>
  )
}

export default SetTimer;
