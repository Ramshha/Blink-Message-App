import React from 'react';
import { auth, signOut } from '../../../FirebaseConfig';
import { useNavigate } from "react-router-dom";
import './Authentication.css'

function Signout(){

  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // navigateTo(`${location}`);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <>
      <span id="logout-btn" onClick={handleLogout}>Logout</span>
    </>
  );
}

export default Signout;