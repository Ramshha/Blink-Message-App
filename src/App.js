import React, { useState } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import { EmailProvider } from './EmailContext';


function App() {;

  return (
      <div>
        <EmailProvider>
          <Navigation />
        </EmailProvider>
      </div>
    );
}

export default App;
