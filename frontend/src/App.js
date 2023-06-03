import React, { useState, createContext } from "react";
import styled from "styled-components";
import Sidebar from "./SideBar";
import Body from "./Body";
import { AppProvider } from './AppContext';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

function App() {
  
  const [loginFlag, setLoginFlag] = useState(false);
  const handleLoginState = (LoginState) => {
    setLoginFlag(LoginState);
  };

  return (
    <AppProvider>
      <Container>
        <Sidebar loginFlag={handleLoginState} />
        <Body />
      </Container>
    </AppProvider>
  );
}

export default App;
