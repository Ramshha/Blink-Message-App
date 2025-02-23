import React from "react";
import NavBar from "../navbar/NavBar";
import ComposeNote from "./composeNote/ComposeNote";
import Footer from "../Footer";


function Home() {

  
  return (
    <>
      
      <NavBar/>

      <ComposeNote />

    
      <Footer/>
    </>
  );
}

export default Home;