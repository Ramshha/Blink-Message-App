import React, { useState, useEffect } from 'react';
import { database, ref, onValue, auth, onAuthStateChanged, push, set, remove } from "../../../../FirebaseConfig";
import './ManageContact.css';
import Edit from '../../../../images/edit.png';
import Save from '../../../../images/save.png';
import Delete from '../../../../images/delete.png';
import Email from '../../../../images/email.png';
import { useEmail } from '../../../../EmailContext';
import { useNavigate } from "react-router-dom";

const ManageContact = () => {
    // State variables
    const [contacts, setContacts] = useState([]); 
    const [user, setUser] = useState(null); 
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [errorName, setErrorName] = useState(''); 
    const [errorEmail, setErrorEmail] = useState(''); 
    const [isEditing, setIsEditing] = useState(null); 
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const { setEmailId } = useEmail(); // Function to set the email ID for sending emails
    const navigateTo = useNavigate(); // Hook for navigation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email regex pattern

    // Effect to monitor authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
                setContacts([]); 
            }
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [auth]);

    // Effect to fetch contacts from the database when user is authenticated
    useEffect(() => {
        if (user) {
            const contactRef = ref(database, `users/${user.uid}/contact-list`);
            const unsubscribe = onValue(contactRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    // Convert the contact data to an array
                    const contactList = Object.entries(data).map(([id, contact]) => ({ id, ...contact }));
                    setContacts(contactList); 
                } else {
                    setContacts([]); 
                }
            });
            return () => unsubscribe(); // Cleanup on unmount
        }
    }, [user]);

    // Validate input fields
    const validateInputs = () => {
        let isValid = true;
        if (!name) {
            setErrorName('Enter Contact Name'); 
            isValid = false;
            setTimeout(() => setErrorName(''), 2000); // Clear error after 2 seconds
        }
        if (!email) {
            setErrorEmail('Enter Contact Email');
            isValid = false;
            setTimeout(() => setErrorEmail(''), 2000);
        } else if (!emailPattern.test(email)) {
            setErrorEmail('Please enter a valid Email');
            isValid = false;
            setTimeout(() => setErrorEmail(''), 2000);
        } else {
            setErrorEmail(''); 
        }
        return isValid; 
    };

    // Function to add a new contact
    const handleAddContact = () => {
        if (validateInputs()) {
            const contactListRef = ref(database, `users/${user.uid}/contact-list`);
            const newContactListRef = push(contactListRef); // Create a new reference for the contact
            set(newContactListRef, {
                name: name,
                email: email,
            }).then(() => {
                // Clear input fields after successful addition
                setName('');
                setEmail('');
            }).catch((error) => {
                console.error('Error adding contact:', error);
            });
        }
    };

    // Function to remove a contact
    const handleRemoveContact = (contactId) => {
        const contactRef = ref(database, `users/${user.uid}/contact-list/${contactId}`);
        remove(contactRef)
            .catch((error) => {
                console.error("Error removing contact: ", error); 
            });
    };

    // Function to start editing a contact
    const handleEditContact = (contact) => {
        setEditedName(contact.name); // Set the name of the contact being edited
        setEditedEmail(contact.email); // Set the email of the contact being edited
        setIsEditing(contact.id); // Set the ID of the contact being edited
    };

    // Function to save changes to a contact
    const handleSaveChanges = () => {
        if (editedName && editedEmail) {
            const contactRef = ref(database, `users/${user.uid}/contact-list/${isEditing}`);
            set(contactRef, {
                name: editedName,
                email: editedEmail,
            }).then(() => {
                // Clear editing state after successful update
                setIsEditing(null);
                setEditedName('');
                setEditedEmail('');
            }).catch((error) => {
                console.error("Error updating contact: ", error);
            });
        }
    };

    // Function to handle email sending for a contact
    const handleSendEmail = (contactId) => {
        navigateTo("/home"); // Navigate to the home page
        const contactRef = ref(database, `users/${user.uid}/contact-list/${contactId}`);
        onValue(contactRef, (snapshot) => {
            const contact = snapshot.val();
            setEmailId(contact.email); // Set the email ID for sending
        });
    };

    return (
        <section className='container my-5 manage-contact'>
            <h2 className='text-center text-danger mb-4'>Contact List</h2>
            
            <div className='add-contact row justify-content-center mb-4'>
                <div className='col-md-4 mb-2'>
                    <label htmlFor='contact-name' className='font-weight-bold'>Enter Contact Name:</label>
                    <input
                        type='text'
                        id='contact-name'
                        name='contact-name'
                        className='form-control'
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Update name state on change
                    />
                    <p className='text-danger'>{errorName}</p> {/* Display name error */}
                </div>
                <div className='col-md-4 mb-2'>
                    <label htmlFor='contact-email' className='font-weight-bold'>Enter Contact Email:</label>
                    <input
                        type='email'
                        id='contact-email'
                        name='contact-email'
                        className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state on change
                    />
                    <p className='text-danger'>{errorEmail}</p> {/* Display email error */}
                </div>
            </div>

            <div className='col-12 text-center mb-5'>
                <button id="add-btn" className='btn' onClick={handleAddContact}>Create Contact</button> {/* Button to add a contact */}
            </div>

            <table className='table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.length > 0 ? (
                        contacts.map((contact, index) => (
                            <tr key={contact.id}>
                                <td>
                                    <p>{index + 1}</p> {/* Display contact index */}
                                </td>
                                <td>
                                    {isEditing === contact.id ? (
                                        <input
                                            type='text'
                                            className='form-control'
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)} // Update edited name on change
                                        />
                                    ) : (
                                        contact.name // Display contact name
                                    )}
                                </td>
                                <td>
                                    {isEditing === contact.id ? (
                                        <input
                                            type='email'
                                            className='form-control'
                                            value={editedEmail}
                                            onChange={(e) => setEditedEmail(e.target.value)} // Update edited email on change
                                        />
                                    ) : (
                                        contact.email // Display contact email
                                    )}
                                </td>
                                <td className='text-center'>
                                    <button className='btn mx-1' onClick={() => handleSendEmail(contact.id)}>
                                        <img src={Email} alt="Email" height='17'/> {/* Button to send email */}
                                    </button>
                                    {isEditing === contact.id ? (
                                        <button className='btn mx-1' onClick={handleSaveChanges}>
                                            <img src={Save} alt="Save" height='20'/> {/* Button to save changes */}
                                        </button>
                                    ) : (
                                        <button className='btn mx-1' onClick={() => handleEditContact(contact)}>
                                            <img src={Edit} alt="Edit" height='20'/> {/* Button to edit contact */}
                                        </button>
                                    )}
                                    <button className='btn mx-1' onClick={() => handleRemoveContact(contact.id)}>
                                        <img src={Delete} alt="Delete" height='20'/> {/* Button to delete contact */}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className='text-center'>Contact List is Empty</td> {/* Message when no contacts are available */}
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default ManageContact;