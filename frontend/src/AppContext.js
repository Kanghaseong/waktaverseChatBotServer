import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [globalObject, setGlobalObject] = useState({
    chatHistory: [],
    name: "",
    picture: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateChatHistory = (newItem) => {
    setGlobalObject((prevState) => ({
      ...prevState,
      chatHistory: [...prevState.chatHistory, newItem],
    }));
  };

  const overWrite = (overwriteValue) => {
    setGlobalObject((prevState) => {
      const updatedChatHistory = [...prevState.chatHistory];
      if (updatedChatHistory.length > 0) {
        const lastIndex = updatedChatHistory.length - 1;
        const lastItem = updatedChatHistory[lastIndex];
        const updatedLastItem = overwriteValue;
        updatedChatHistory[lastIndex] = updatedLastItem;
      }
      return {
        ...prevState,
        chatHistory: updatedChatHistory,
      };
    });
  };
  
  

  return (
    <AppContext.Provider value={{ globalObject, isLoading, updateChatHistory, overWrite, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
};
