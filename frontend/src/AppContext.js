import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [globalObject, setGlobalObject] = useState({
    chatHistory : [],
    name: "",
    picture: ""
  });
  const updateChatHistory = (newItem) => {
    setGlobalObject(prevState => ({
      ...prevState, 
      chatHistory: [...prevState.chatHistory, newItem]
    }));
  };

  return (
    <AppContext.Provider value={{globalObject, updateChatHistory}}>
      {children}
    </AppContext.Provider>
  );
};
