import React, { useState } from "react";
import styled from "styled-components";
import SideBarItem from "./SideBarItem";
import GoogleLoginButton from "./Auth";
import NewChatButton from "./NewChatButton";

const SideBarStyled = styled.div`
  margin: 0;
  padding: 0;
  flex: 1;
  background-color: #6096B4;
  display: flex;
  flex-direction: column;
`;

const GoogleLoginWrapper = styled.div`
  position: absolute;
  bottom: 0; /* 하단에 위치하도록 설정 */
  margin: 1rem;
`;

export default function SideBar({loginFlag}) {
    const [sidebarItems, setSidebarItems] = useState([]);
    const [isLogin, setIsLogin] = useState(false);

    const handleAddItem = () => {
      const newItem = <SideBarItem key={sidebarItems.length} />;
      setSidebarItems((prevItems) => [...prevItems, newItem]);
    } 

    const handleLoginState = (LoginState)=> {
      setIsLogin(LoginState);
      loginFlag(LoginState);
    }
    
  return (
    <SideBarStyled>
        <NewChatButton onAddItem={handleAddItem}/>
        {sidebarItems}  

        
      <GoogleLoginWrapper>
        {isLogin ? <div>hi, ***</div> : <GoogleLoginButton loginFlag={handleLoginState}/>}
      </GoogleLoginWrapper>
    </SideBarStyled>
  );
}
