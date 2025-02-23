import React, { useState, useEffect } from 'react';
import { database, ref as databaseRef, set, push } from "../../../../FirebaseConfig";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import SetTimer from "../setTimer/SetTimer";
import DestroyMethod from "../destroyMethod/DestroyMethod";
import EmailRecipient from '../emailRecipient/EmailRecipient';
import ShareNote from '../shareNote/ShareNote';
import '../Home.css';
import { useEmail } from '../../../../EmailContext';

const ComposeNote = () => {
  const { emailId: contextEmailId } = useEmail(); // Retrieve email ID from context
  const [note, setNote] = useState("");
  const [title, setTitle] = useState(""); 
  const [file, setFile] = useState(null); 
  const [emails, setEmails] = useState(Array.isArray(contextEmailId) ? contextEmailId : [contextEmailId || '']); // State for email recipients
  const [timer, setTimer] = useState(10); 
  const [error, setError] = useState(""); 
  const [shareData, setShareData] = useState(null); 
  const [destructionMethod, setDestructionMethod] = useState("burn"); 

  // Update emails when contextEmailId changes
  useEffect(() => {
    setEmails(Array.isArray(contextEmailId) ? contextEmailId : [contextEmailId || '']);
  }, [contextEmailId]);

  // Handle changes in destruction method
  const handleMethodChange = (method) => {
    setDestructionMethod(method);
  };

  // Handle input changes for various fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "title") setTitle(value);
    else if (name === "note") setNote(value);
    else if (name === "file") setFile(files[0]);
    else if (name === 'timer') setTimer(Number(value));
  };

  // Handle email input changes
  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  // Add a new email input field
  const addEmail = () => {
    setEmails([...emails, '']);
  };

  // Upload file to Firebase Storage
  const handleFileUpload = async (file) => {
    const storage = getStorage();
    const fileRef = storageRef(storage, `files/${file.name}`);
    
    try {
      await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(fileRef);
      return fileURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file.");
    }
  };

  // Generate a random password
  const generatePassword = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  };

  // Handle form submission to create a note
  const handleMessage = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    const isAnyFieldFilled = title && note && emails.some(email => email.trim() !== '');
    if (!isAnyFieldFilled) {
      setError("Please fill in all fields.");
      return;
    }
  
    setError("");
  
    // Authenticate user
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user?.uid;
  
    if (user && userId) {
      try {
        const noteRef = databaseRef(database, 'notes');
        
        // Store note data in the database
        const notePromises = emails.map(async (email) => {
          if (email) {
            const newNoteRef = push(noteRef);
            const noteId = newNoteRef.key;
            const password = generatePassword(6); // Generate password for note
            
            const noteObject = {
              noteData: {
                title: title,
                note: note,
                timer: timer,
                fileURL: file ? await handleFileUpload(file) : null,
                destruct: destructionMethod,
              },
              email: email,
              password: password,
              userID: user.uid,
            };
    
            await set(newNoteRef, noteObject); // Save note to database
            return { noteId, email, password };
          }
        });
        
        const results = (await Promise.all(notePromises)).filter(result => result); // Filter out any undefined results
  
        setShareData({
          data: results,
          title: title,
        });
  
        // Clear input fields after submission
        setTitle("");
        setNote("");
        setFile(null);
        setTimer(10);
        setEmails(['']);
        document.getElementById('file').value = '';
  
      } catch (error) {
        console.error("Error saving data:", error);
        alert("Error saving data: " + error.message);
      }
    } else {
      alert("User is not authenticated or UID is missing.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center compose-note mb-5 pb-5">
      <div className="col-md-8">
        <h2 className="text-center my-5">Create Note</h2>
        {error && <p className="text-danger">{error}</p>}
        <div className='card p-5 shadow-lg'>
          <form className="d-flex flex-column">
            <div className="form-group mb-3">
              <label htmlFor="title">Note Title:</label>
              <input type="text" className="form-control" id="title" name="title" placeholder="Enter your title" value={title} onChange={handleChange} required />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="note">Note:</label>
              <textarea className="form-control shadow" id="note" name="note" rows="5" placeholder="Enter your secret message..." value={note} onChange={handleChange} required />
            </div>

            <div className="row my-3">
              <div className="form-group mb-3 col-md-4">
                <label htmlFor="file">Attach File:</label>
                <input type="file" className="form-control-file" id="file" onChange={(e) => setFile(e.target.files[0])} />
              </div>

              <div className="col-md-4">
                <SetTimer timer={timer} handleChange={handleChange} />
              </div>

              <div className="col-md-4">
                <DestroyMethod handleMethodChange={handleMethodChange} />
              </div>
            </div>

            <div className="form-group mb-3">
              <EmailRecipient emails={emails} handleEmailChange={handleEmailChange} addEmail={addEmail} />
            </div>

            {shareData && (
              <ShareNote
                data={shareData.data} 
                noteTitle={shareData.title} 
                handleClose={() => setShareData(null)} 
              />
            )}

            <button 
              type="button" 
              className="btn text-light d-block mx-auto my-3 send-btn" 
              onClick={handleMessage}
            >
              Send Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComposeNote;
