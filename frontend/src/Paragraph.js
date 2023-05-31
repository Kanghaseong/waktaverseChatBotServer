import React, { useState, useEffect } from "react";

import styled from "styled-components";

const Div = styled.div`
  display: flex;
  text-align: left;
  margin-bottom: 1rem;

  margin: 2rem 2rem;
  
`;

const Img = styled.img`
  margin-left: 28rem;
  width: 3rem;
  height: 3rem;
  border-radius: 5%;
  border: 1px solid #7a776d;
`;

const Ptag = styled.p`
  margin-left: 5vh;
`;
const PtagCon = styled.div`
  width: 40rem;
`;
export default function ParaGraph({ history, imageUrl }) {
  return (
    <Div>
      <Img src={imageUrl} alt="user-image" />
      <PtagCon>
        <Ptag>{history}</Ptag>
      </PtagCon>
    </Div>
  );
}

