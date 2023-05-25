import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #7d9d9c;
  text-align: center;
  margin: 0.5rem;
  height: 3rem;
  line-height: 3rem;
  border-radius: 3%;
  border: 2px solid #6b8786;
  padding: 0;
  cursor: pointer;

  &:active {
    transform: translateY(1px); /* 버튼을 아래로 1px 이동시킵니다 */
  }
`;

export default function NewChatButton({ onAddItem }) {
    const handleClick = () => {
      onAddItem();
    };
  
    return <Button onClick={handleClick}>New Chat</Button>;
  }