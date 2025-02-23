import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, onValue, get, remove } from 'firebase/database';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAXsjNzoVjcXZ-uAcVVlkdPuCiQ_n4LDbI",
  authDomain: "blink-message.firebaseapp.com",
  databaseURL: "https://blink-message-default-rtdb.firebaseio.com",
  projectId: "blink-message",
  storageBucket: "blink-message.appspot.com",
  messagingSenderId: "227929274402",
  appId: "1:227929274402:web:78325537ba3f3e55d8f27b",
  measurementId: "G-TWC80NQSLL"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, ref, set, push, onValue, get, remove };

