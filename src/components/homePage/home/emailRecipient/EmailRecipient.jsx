import React from 'react';
import '../Home.css'

const EmailRecipient = ({ emails, handleEmailChange, addEmail}) => {
  return (
    <div >
      <label htmlFor='email'>Recipient Email:</label>
      {emails.map((email, index) => (
        <div key={index} className='email-inputs-container col-md-3'>
          <input type='email' id="email" name={`email-${index}`} value={email}
            onChange={(e) => handleEmailChange(index, e.target.value)}
            placeholder="Enter recipient email"
          />
        </div>
      ))}
      <br/>
      <button id="add-email-btn" type="button" onClick={addEmail}>Add Email</button>  
    </div>
  );
}

export default EmailRecipient;

