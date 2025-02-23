import React, { createContext, useContext, useState } from 'react';

// Create the context
const EmailContext = createContext();

// Create a provider component
export function EmailProvider({ children }) {
  const [emailId, setEmailId] = useState('');

  return (
    <EmailContext.Provider value={{ emailId, setEmailId }}>
      {children}
    </EmailContext.Provider>
  );
}

// Custom hook for using the context
export function useEmail() {
  return useContext(EmailContext);
}