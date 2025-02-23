import React from 'react';
import NavBar from '../navbar/NavBar';
import ManageContact from './manageContact/ManageContact';
import Footer from '../Footer';

function Contact(){
  return (
    <>
      <NavBar />

      <ManageContact/>


      <Footer/>
    </>
  )
}

export default Contact;