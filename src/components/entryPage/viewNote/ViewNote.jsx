import React, { useState, useEffect } from 'react';
import { database, ref as databaseRef, onValue, set, push, remove, get } from '../../../FirebaseConfig';
import { getAuth } from 'firebase/auth';
import './ViewNote.css';
import emailjs from 'emailjs-com';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewNote = () => {
  // State variables
  const [noteId, setNoteId] = useState('');
  const [password, setPassword] = useState(''); 
  const [noteData, setNoteData] = useState(null);
  const [error, setError] = useState('');
  const [remainingTime, setRemainingTime] = useState(0); // Timer for note visibility
  const [timerRunning, setTimerRunning] = useState(false); // Flag to control timer state
  const [animationTriggered, setAnimationTriggered] = useState(false); // Flag for animation state
  const [animationCompleted, setAnimationCompleted] = useState(false); // Flag to indicate if animation is done

  // Get current user from authentication
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null; // Get user ID

  // Effect for managing the countdown timer
  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(interval);
            setTimerRunning(false);
            triggerAnimation(); // Trigger animation when time runs out
            return 0;
          } else {
            return prevTime - 1; // Decrease remaining time
          }
        });
      }, 1000);
    } else {
      clearInterval(interval); // Clear interval if timer is not running
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [timerRunning]);

  // Effect to handle the completion of animation
  useEffect(() => {
    if (animationTriggered && !animationCompleted) {
      const animationDuration = 4000; // Duration for the animation
      const timer = setTimeout(() => {
        setAnimationCompleted(true); // Mark animation as completed after the duration
      }, animationDuration);
      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [animationTriggered, animationCompleted]);

  // Function to trigger animation
  const triggerAnimation = () => {
    if (noteData && !animationTriggered) {
      console.log('Triggering animation:', noteData.destructionMethod);
      setAnimationTriggered(true); // Set the animation trigger flag
    }
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'noteId') {
      setNoteId(value); // Update note ID
    } else if (name === 'password') {
      setPassword(value); // Update password
    }
  };

  // Function to view the note
  const handleViewNote = async () => {
    // Reset states before fetching the note
    setNoteData(null);
    setRemainingTime(0);
    setTimerRunning(false);
    setError('');
    setAnimationTriggered(false);
    setAnimationCompleted(false);

    // Validate input fields
    if (!noteId.trim() || !password.trim()) {
      setError("Please fill in all fields."); 
      return;
    }
    setError(""); 

    // Reference to the note in the database
    const noteRef = databaseRef(database, `notes/${noteId}`);

    // Fetch the note data from the database
    onValue(noteRef, async (snapshot) => {
      const note = snapshot.val();
      if (note) {
        if (note.password === password) {
          // If the password matches, extract note data
          const { noteData } = note;
          const { note: noteContent, timer, title, fileURL, destruct } = noteData;

          // Set note data and start the timer
          setNoteData({ note: noteContent, timer, title, fileURL, destructionMethod: destruct });
          setRemainingTime(timer);
          setTimerRunning(true);

          // Notification logic for when a note is read
          try {
            const senderNotificationsRef = databaseRef(database, `users/${note.userID}/notifications`);
            const newNotificationRef = push(senderNotificationsRef);
            await set(newNotificationRef, {
              notify: `Note with Title "${title}" has been read by ${note.email}`,
              timeStamp: Date.now(),
              read: false,
            });
            console.log('Notification sent successfully');
          } catch (error) {
            console.error('Error storing user data:', error);
          }

          // Email notification logic
          try {
            const userDatabaseRef = databaseRef(database, `users/${note.userID}`);
            const userSnapshot = await get(userDatabaseRef);
            const userData = userSnapshot.val();
            const userName = userData.fullName;
            const userEmail = userData.email;
            await emailjs.send("service_8efa82o", "template_s19zm1q", {
              to_email: userEmail,
              userName: userName,
              recipient: note.email,
            }, 'tYYj_KIYOzbrI3O8b');
            console.log('Email sent successfully');
          } catch (error) {
            console.error('Error sending email:', error);
          }

          // Delete the note after reading
          try {
            await remove(noteRef);
            console.log('Note deleted successfully');
            setError(''); // Clear error after successful deletion
          } catch (error) {
            console.error('Error deleting note:', error);
          }
        } else {
          setError('Incorrect password or note not found.'); // Error if password is incorrect
          setNoteData(null); // Clear note data on error
        }
      } else {
        setError('Note not found.'); // Error if note is not found
      }
    }, (error) => {
      console.error('Error fetching note:', error);
      setError('Failed to fetch note.'); // Error handling for fetching note
    });

    // Reset input fields after trying to view the note
    setPassword('');
    setNoteId('');
  };

  // Function to render the shredding effect for note destruction
  const renderShredEffect = (text) => {
    const shredPieces = [];
    const numberOfPieces = text.length;
    for (let i = 0; i < numberOfPieces; i++) {
      shredPieces.push(
        <span className="shred-piece" style={{ '--i': i }} key={i}>
          {text[i]} {/* Create shredded pieces of the note */}
        </span>
      );
    }
    return shredPieces; 
  };

  // Render the note content with animations
  const renderNoteContent = () => {
    if (!noteData) return null; 

    const { note, title, fileURL, destructionMethod } = noteData;

    let noteClassName = '';
    let shredEffect = null;

    // Determine the animation class and effect based on destruction method
    if (animationTriggered && !animationCompleted) {
      switch (destructionMethod) {
        case 'burn':
          noteClassName = 'burn-animation';
          break;
        case 'shred':
          noteClassName = 'shred-animation';
          shredEffect = renderShredEffect(note); // Get shredded effect
          break;
        case 'disappear':
          noteClassName = 'disappear-animation';
          break;
        default:
          noteClassName = '';
      }
    }

    // Message container to display the note and animations
    return (
      <div className="container mt-5 message-container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-10">
            {remainingTime > 0 ? (
              <>
                <div className="card border-danger text-center shadow-lg">
                  <h6 className="card-header text-muted mb-3">
                    Time remaining: <span className='text-danger py-1 px-3 rounded timer'>{remainingTime} seconds</span>
                  </h6>
                  <div className="card-body">
                    <div className="card-title">
                      {title && <h4 className="mb-4">{title}</h4>} {/* Display note title */}
                    </div>
                    <div id="note" className="card-body">
                      {note && !shredEffect && <p>{note}</p>} {/* Display note content */}
                      {shredEffect} {/* Render shredding effect if applicable */}
                      {fileURL && (
                        <div className="text-muted mt-3">
                          <p>Attachment: <button id="file-btn"><a href={fileURL} target="_blank" rel="noopener noreferrer" className="btn btn-link">View File</a></button></p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div id="note" className={`card border-danger text-center ${noteClassName}`}>
                <div className="card-body">
                  <div className="card-title">
                    {title && <h4 className="mb-4">{title}</h4>} {/* Display note title again after timer */}
                  </div>
                  <div id="note" className="card-body">
                    {note && !shredEffect && <p>{note}</p>} {/* Display note content again */}
                    {shredEffect} {/* Render shredding effect if applicable */}
                    {fileURL && (
                      <div className="text-muted mt-3">
                        <p>Attachment: <button id="file-btn"><a href={fileURL} target="_blank" rel="noopener noreferrer" className="btn btn-link">View File</a></button></p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container view-note">
      <h2 className="text-center my-4">View Note</h2>
      {error && <p className="text-danger text-center my-2">{error}</p>} {/* Display error messages */}

      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="form-group mt-3">
            <label htmlFor="noteId">Enter Note ID:</label>
            <input
              type="text"
              id="noteId"
              name="noteId"
              className="form-control"
              value={noteId}
              onChange={handleChange} // Handle input change for note ID
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="password">Enter Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={password}
              onChange={handleChange} // Handle input change for password
            />
          </div>

          <div className="text-center mt-3">
            <button id="view-btn" className="btn text-light" onClick={handleViewNote}>View Note</button> {/* Button to view note */}
          </div>
        </div>
      </div>

      {!animationCompleted && (
        <div id="message-container" className="mt-4">
          {renderNoteContent()} {/* Render the note content */}
        </div>
      )}
    </div>
  );
};

export default ViewNote;
