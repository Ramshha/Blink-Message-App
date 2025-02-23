// src/NoteDisplay.js

import React, { useEffect, useState } from 'react';
import { ref, get, remove } from 'firebase/database';
import { database } from './FirebaseConfig';

function NoteDisplay({ noteId }) {
  const [note, setNote] = useState(null);

  useEffect(() => {
    const noteRef = ref(database, `notes/${noteId}`);
    get(noteRef).then(snapshot => {
      if (snapshot.exists()) {
        setNote(snapshot.val());
        remove(noteRef);
      } else {
        console.log("No data available");
      }
    }).catch(error => {
      console.error("Error fetching note:", error);
    });
  }, [noteId]);

  return (
    <div>
      {note ? (
        <div>
          <p>{note.note}</p>
          <p><em>This note will self-destruct after being viewed.</em></p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default NoteDisplay;