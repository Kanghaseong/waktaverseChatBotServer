import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { ReactComponent as Svg } from "./assets/SubmitButtonSvg.svg";
import ParaGraph from "./Paragraph";
import { useAppContext } from './AppContext';
const BodyStyled = styled.div`
  display: flex;
  flex: 6.5;
  flex-direction: column;
  text-align: center;
`;

const TextAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fffaee;
  overflow: auto;
  height: 100vh;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    height: 1rem;
    width: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #CFB997;
    border-radius: 9999px;
    border-width: 1px;
}

`;

const TextStyled = styled.div`
  border-bottom: 1px solid #EEE9DA;
  background-color: ${(props) =>
    props.primary % 2 == 0 ? "#fffaee" : "#EEE9DA"};
`;

const InputAreaStyled = styled.div`
  display: flex;
  background-color: #c8d9e3;
  flex-direction: column;
  justify-content: flex-end;
  height: 20vh;
`;

const InputBoxStyled = styled.div`
  background-color: #c8d9e3;
  height: 9vh;
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
  background-color: #dfeaf0;
  border: 1px;
  border-radius: 5px;
  padding-left: 10px;
  &:hover {
    border: 1px solid #daebf5;
  }
  box-sizing: border-box; /* box-sizing 속성 추가 */
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
`;

const RotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AnimatedSvg = styled(Svg)`
  animation: ${RotateAnimation} 1s linear infinite;
`;

export default function Body() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useAppContext();
  const textareaRef = useRef(null);
  const imageUrls = ["logo192.png", "gosegu-profile-image.jpg"];
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const apiEndpointDEV = "http://localhost:4000/chat";
  axios.defaults.withCredentials = true;

  useEffect(() => {
    // 요소가 추가될 때 스크롤을 가장 아래로 이동
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [chatHistory]); // chatHistory 배열이 업데이트될 때마다 useEffect가 호출되도록 설정

  const handleButtonClick = async (event) => {
    event.preventDefault();
    if (inputValue) {
      setChatHistory([...chatHistory, inputValue]);
      //setContents([...contents, inputValue]);
      setIsLoading(true);
      setInputValue("");
      try {
        const response = await axios.post(
          apiEndpointDEV,
          { inputValue },
          { withCredentials: true }
        );
        //setContents((prevItems) => [...prevItems, response.data]);
        setChatHistory((prevItems) => [...prevItems, response.data]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // 유저가 인풋창에 아무값도 넣지 않았을때 로직
      alert("할 말을 입력하고 전송하세요.");
    }
  };

  return (
    <BodyStyled>
      <TextAreaStyled ref={textareaRef}>
        {chatHistory.map((history, index) => (
          <TextStyled key={index} primary={index}>
            <ParaGraph
              history={history}
              imageUrl={imageUrls[index % 2]}
            ></ParaGraph>
          </TextStyled>
        ))}
      </TextAreaStyled>

      <InputAreaStyled>
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
              {isLoading ? <AnimatedSvg /> : <Svg />}
            </Button>
          </form>
        </InputBoxStyled>
      </InputAreaStyled>
    </BodyStyled>
  );
}
