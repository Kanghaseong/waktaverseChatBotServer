import React, { useState } from "react";
import styled from "styled-components";
import SideBarItem from "./SideBarItem";
import GoogleLoginButton from "./Auth";
import NewChatButton from "./NewChatButton";

const SideBarStyled = styled.div`
  margin: 0;
  padding: 0;
  flex: 1;
  background-color: #576F72;
  display: flex;
  flex-direction: column;
`;

const GoogleLoginWrapper = styled.div`
  position: absolute;
  bottom: 0; /* 하단에 위치하도록 설정 */
  margin: 1rem;
`;

export default function SideBar() {
    const [sidebarItems, setSidebarItems] = useState([]);

    const handleAddItem = () => {
      const newItem = <SideBarItem key={sidebarItems.length} />;
      setSidebarItems((prevItems) => [...prevItems, newItem]);
    }
    
  return (
    <SideBarStyled>
        <NewChatButton onAddItem={handleAddItem}/>
        {sidebarItems}

        
      <GoogleLoginWrapper>
        <GoogleLoginButton />
      </GoogleLoginWrapper>
    </SideBarStyled>
  );
}
