import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ReactComponent as Svg } from "./assets/SubmitButtonSvg.svg";
const BodyStyled = styled.div`
  display: flex;
  flex: 6.5;
  background-color: #eee9da;
  flex-direction: column;
  text-align: center;
`;

const InputAreaStyled = styled.div`
  display: flex;
  background-color: #bdcdd6;
  flex-direction: column;
  justify-content: flex-end;
  height: 20vh;
`;

const InputBoxStyled = styled.div`
  background-color: #bdcdd6;
  height: 9vh;
`;
const TextAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eee9da;
  overflow: auto;
  height: 100vh;
`;
const TextStyled = styled.div`
  background-color: #d1ccbc;
`;

const WaitingDiv = styled.div`
  background-color: #d1ccbc;
`;

const Input = styled.input`
  outline: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  width: 30rem;
  height: 2.5rem;
  line-height: 2.5rem;
  background-color: #cfdfe8;
  border: 1px;
  border-radius: 5px;
  &:hover {
    border: 1px solid #daebf5;
  }
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
`;

export default function Body() {
  const [contents, setContents] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const apiEndpointDEV = "http://localhost:4000/chat";
  axios.defaults.withCredentials = true;

  const handleButtonClick = async (event) => {
    if (inputValue) {
      event.preventDefault();
      setContents([...contents, inputValue]);
      setIsLoading(true);
      setInputValue("");
      try {
        const response = await axios.post(
          apiEndpointDEV,
          { inputValue },
          { withCredentials: true }
        );
        setContents((prevItems) => [...prevItems, response.data]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    else {
      // 유저가 인풋창에 아무값도 넣지 않았을때 로직
      alert("할 말을 입력하고 전송하세요.")
    }
  };

  return (
    <BodyStyled>
      <TextAreaStyled>
        {contents.map((content, index) => (
          <TextStyled key={index}>{content}</TextStyled>
        ))}
      </TextAreaStyled>

      <InputAreaStyled>
        <WaitingDiv>{isLoading && <p>Loading...</p>}</WaitingDiv>
        <InputBoxStyled>
          <form onSubmit={handleButtonClick}>
            <label>
              <Input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
            </label>
            <Button type="submit" disabled={isLoading}>
              <Svg></Svg>
            </Button>
          </form>
        </InputBoxStyled>
      </InputAreaStyled>
    </BodyStyled>
  );
}
