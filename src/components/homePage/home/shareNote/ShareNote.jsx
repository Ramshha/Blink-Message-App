import React, { useState, useEffect, useRef } from 'react';
import './ShareNote.css';
import emailjs from 'emailjs-com';
import Copy from '../../../../images/copy.png';

// ShareNote component for sharing notes via email
const ShareNote = ({ data = [], noteTitle, handleClose }) => {
  // State to control which popups to show for copied IDs and passwords
  const [showPopupId, setShowPopupId] = useState({});
  const [showPopupPass, setShowPopupPass] = useState({});
  
  // Ref for the dialog element
  const dialogRef = useRef(null);

  // Effect to show the dialog if there is data, otherwise close it
  useEffect(() => {
    if (dialogRef.current) {
      if (data.length) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [data]);

  // Effect to handle the dialog's close event
  useEffect(() => {
    const closeDialog = () => {
      if (handleClose) {
        handleClose();
      }
    };
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.addEventListener('close', closeDialog);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (dialog) {
        dialog.removeEventListener('close', closeDialog);
      }
    };
  }, [handleClose]);

  // Function to send emails using EmailJS
  const handleSendEmail = async () => {
    try {
      await Promise.all(data.map(({ email, password, noteId }) => {
        return emailjs.send("service_8efa82o", "template_3ap67ov", {
          to_email: email,
          subject: noteTitle,
          noteId: noteId,
          password: password,
        }, 'tYYj_KIYOzbrI3O8b');
      }));

      alert('Emails sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    }
  };

  // Function to copy the Note ID to the clipboard
  const copyNoteId = (text, index) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Show popup notification for copying Note ID
        setShowPopupId(prev => ({ ...prev, [index]: true }));
        setTimeout(() => {
          setShowPopupId(prev => ({ ...prev, [index]: false }));
        }, 1500);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  // Function to copy the password to the clipboard
  const copyPassword = (text, index) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Show popup notification for copying password
        setShowPopupPass(prev => ({ ...prev, [index]: true }));
        setTimeout(() => {
          setShowPopupPass(prev => ({ ...prev, [index]: false }));
        }, 1500);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <dialog className="container text-center py-4 col-lg-6 share-note" ref={dialogRef}>
      <h3>Your message is ready to be shared!</h3>
      <div id="note-info">
        {data.length > 0 && (
          <>
            <table className='table my-4'>
              <thead>
                <tr>
                  <th>Email</th>
                  <th colSpan='2'>Note ID</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {data.map(({ email, noteId, password }, index) => (
                  <tr key={email}>
                    <td>{email}</td>
                    <td colSpan='2'>
                      {noteId}
                      <button className="copy-btn" onClick={() => copyNoteId(noteId, index)}>
                        <img src={Copy} alt="copy" height="15px"/>
                      </button>
                      {showPopupId[index] && <div className="popup">Copied!</div>}
                    </td>
                    <td>
                      {password}
                      <button className="copy-btn" onClick={() => copyPassword(password, index)}>
                        <img src={Copy} alt="copy" height="15px"/>
                      </button>
                      {showPopupPass[index] && <div className="popup">Copied!</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p id="comment">Please make sure to copy the passwords before you exit.</p>
          </>
        )}
      </div>
      <div>
        <button onClick={handleSendEmail} className="share-btn">Send Email</button>
        <button onClick={() => dialogRef.current.close()} className="close-btn">Exit</button>
      </div>
    </dialog>
  );
};

export default ShareNote;


