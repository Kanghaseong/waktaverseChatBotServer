import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "./SideBar";
import Body from "./Body";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;


function App() {
  
  return (
      <Container>
        <Sidebar/>
        <Body/>
      </Container>
  );
}

export default App;
