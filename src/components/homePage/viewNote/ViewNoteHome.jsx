import React from 'react'
import NavBar from '../navbar/NavBar';
import ViewNote from '../../entryPage/viewNote/ViewNote';
import Footer from '../Footer';

const ViewNoteHome = () => {
  return (

    <section>
        <NavBar/>
        <ViewNote/>
        <Footer/>
    </section>
  )
}

export default ViewNoteHome;