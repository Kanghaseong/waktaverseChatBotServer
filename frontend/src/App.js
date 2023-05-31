import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "./SideBar";
import Body from "./Body";

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
    <Container>
      <Sidebar loginFlag={handleLoginState}/>
      <Body />
    </Container>
  );
}

export default App;
