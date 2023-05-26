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

  &:hover {
    background-color: #8eabab; /* 호버링할 때 밝아지는 색상 */
  }
`;


export default function SideBarItem() {

  return (
    <Button>
        <div>chat title name</div>
    </Button>
  )
}
