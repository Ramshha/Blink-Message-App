import React from 'react';
import { Routes, Route } from "react-router-dom";
import Authentication from '../entryPage/authentication/Authentication';
import RegisterPage from '../entryPage/authentication/RegisterPage';
import Home from '../homePage/home/Home';
import Contact from '../homePage/contact/Contact';
import EntryPage from '../entryPage/EntryPage';
import ViewNotePage from '../entryPage/viewNote/ViewNotePage';
import ViewNoteHome from '../homePage/viewNote/ViewNoteHome';
import About from '../homePage/about/About';
import Policy from '../homePage/about/Policy';


function Navigation(){
  return (
    <>
      <Routes>
        <Route path="/" exact element={<EntryPage/>}/>
        <Route path="/login" element={<Authentication/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/contact-list" element={<Contact/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/view-note" element={<ViewNotePage/>}/>
        <Route path="/view-note-home" element={<ViewNoteHome/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/policy" element={<Policy/>}/>
      </Routes>
    </>
  )
}

export default Navigation;