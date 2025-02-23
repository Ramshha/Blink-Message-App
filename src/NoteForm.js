import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { database } from './FirebaseConfig';

function NoteForm() {
    const [note, setNote] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const password = uuidv4(); // Generate a unique password

        try {
            const newNoteRef = ref(database, 'notes');
            await push(newNoteRef, {
                note: note,
                email: email,
                password: password, // Store the password in the Realtime Database
            });

            setNote('');
            setEmail('');
            alert(`Note created with password: ${password}`); // Display the password to the user
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter your note"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter recipient's email"
            />
            <button type="submit">Create Note</button>
        </form>
    );
}

export default NoteForm;
