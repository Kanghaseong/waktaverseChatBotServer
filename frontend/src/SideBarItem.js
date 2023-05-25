import React, { useState } from "react";
import styled from "styled-components";

const SideBarItemStyled = styled.div`
  background-color: #7D9D9C;
  text-align: center;
  margin: 0.5rem;
  height: 3rem;
  line-height: 3rem;
  border-radius: 3%;
`;

export default function SideBarItem() {

  return (
    <SideBarItemStyled>
        <div>chat title name</div>
    </SideBarItemStyled>
  )
}
