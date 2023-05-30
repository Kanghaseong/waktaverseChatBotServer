import React, { useState, useEffect } from "react";

import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: row;
  text-align: left;
  margin-bottom: 1rem;

  align-items: center;
  height: 6vh;
`;

const Img = styled.img`
  margin-left: 32rem;
  width: 2rem;
  height: 2rem;
  border: 1px solid black   ;
`;

const Ptag = styled.p`
  margin-left: 5vh;
`;
const PtagCon = styled.div`

  width:40rem;
`;
export default function ParaGraph({ content }) {
  return (
    <Div>
      <Img src="logo192.png" alt="user-image" />
      <PtagCon>
        <Ptag>{content}</Ptag>
      </PtagCon>
    </Div>
  );
}
