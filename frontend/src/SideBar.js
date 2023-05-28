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
    const [isLogin, setIsLogin] = useState(false); // 이 변수이름도 로그인플래그로 하는게 맞는거같은데 일단 보류 중

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
        {isLogin ? <div>로그인 되었습니다.</div> : <GoogleLoginButton loginFlag={handleLoginState}/>}
      </GoogleLoginWrapper>
    </SideBarStyled>
  );
}
