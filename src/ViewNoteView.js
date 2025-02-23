import React, { useState } from 'react';
import { ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { database } from './FirebaseConfig';

function ViewNoteView() {
    const [password, setPassword] = useState('');
    const [note, setNote] = useState('');

    const handleFetchNote = async () => {
        const notesRef = ref(database, 'notes');
        const notesQuery = query(notesRef, orderByChild('password'), equalTo(password));

        try {
            const snapshot = await get(notesQuery);
            if (snapshot.exists()) {
                const data = snapshot.val();
                const noteData = Object.values(data)[0]; // Get the first note that matches the password
                setNote(noteData.note);
            } else {
                alert('Note not found or incorrect password');
            }
        } catch (error) {
            console.error("Error fetching note: ", error);
        }
    };

    return (
        <div>
            <h2>View Note</h2>
            <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter note password"
            />
            <button onClick={handleFetchNote}>View Note</button>
            <br></br>
            {note && <div>{note}</div>}
        </div>
    );
}

export default ViewNoteView;
