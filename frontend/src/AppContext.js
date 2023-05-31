import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext([]);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <AppContext.Provider value={[chatHistory, setChatHistory]}>
      {children}
    </AppContext.Provider>
  );
};
