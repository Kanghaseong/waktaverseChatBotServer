import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useAppContext } from "./AppContext";
import { ReactComponent as SubmitButtonSvg } from "./assets/SubmitButtonSvg.svg";
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
  background-color: #e2e2e2;
`;

const Ptag = styled.p`
  margin-left: 5vh;
`;
const PtagCon = styled.div`
  width: 40rem;
`;
const RotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const AnimatedSvg = styled(SubmitButtonSvg)`
  animation: ${RotateAnimation} 1s linear infinite;
`;

export default function ParaGraph({ history, imageUrl, isLastKey }) {
  const { isLoading } = useAppContext();
  return (
    <Div>
      <Img src={imageUrl} alt="user-image" />
      <PtagCon>
        <Ptag>
          {isLastKey && isLoading && <AnimatedSvg />}
          {history}
        </Ptag>
      </PtagCon>
    </Div>
  );
}
