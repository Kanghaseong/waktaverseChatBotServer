import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ReactComponent as SendButtonSvg } from "./assets/SendButtonSvg.svg";
import ParaGraph from "./Paragraph";
import { useAppContext } from "./AppContext";
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
    background-color: #cfb997;
    border-radius: 9999px;
    border-width: 1px;
  }
`;

const TextStyled = styled.div`
  border-bottom: 1px solid #eee9da;
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

const Input = styled.input`
  outline: none;
  -webkit-tap-highlight-color: transparent;
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
  &:focus {
    border: 1px solid #e8f7ff; /* 포커스 시 아웃라인 스타일 추가 */
    box-shadow: 0 0 5px #e8f7ff; /* 포커스 시 그림자 효과 추가 */
  }
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
`;

const StyledSvg = styled(SendButtonSvg)`
  width: 2rem;
  height: 2rem;
  background-color: ${(props) => (props.hasInputValue ? "#e8f7ff" : "initial")};
  transition: background-color 0.5s ease, fill 0.5s ease;
  border-radius: 5px;
  fill: ${(props) => (props.hasInputValue ? "#368ff5" : "#6c8891")};
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Body() {
  const [inputValue, setInputValue] = useState("");
  const {
    globalObject,
    updateChatHistory,
    overWrite,
    isLoading,
    setIsLoading,
  } = useAppContext();
  const textareaRef = useRef(null);
  const imageUrls = ["basicPicture.png", "gosegu-profile-image.jpg"];
  const apiEndpoint =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4001/chat"
      : process.env.REACT_APP_API_ENDPOINT;
  axios.defaults.withCredentials = true;

  useEffect(() => {
    // 요소가 추가될 때 스크롤을 가장 아래로 이동
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [globalObject.chatHistory]); // chatHistory 배열이 업데이트될 때마다 useEffect가 호출되도록 설정

  const handleButtonClick = async (event) => {
    event.preventDefault();

    if (inputValue) {
      updateChatHistory(inputValue);
      updateChatHistory("");
      setIsLoading(true);
      setInputValue("");
      try {
        const response = await axios.post(apiEndpoint, { inputValue });
        overWrite(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("할 말을 입력하고 전송하세요.");
    }
  };

  return (
    <BodyStyled>
      <TextAreaStyled ref={textareaRef}>
        {globalObject.chatHistory.map((history, index) => (
          <TextStyled key={index} primary={index}>
            <ParaGraph
              history={history}
              imageUrl={imageUrls[index % 2]}
              isLastKey={index === globalObject.chatHistory.length - 1}
            ></ParaGraph>
          </TextStyled>
        ))}
      </TextAreaStyled>

      <InputAreaStyled>
        <InputBoxStyled>
          <Form onSubmit={handleButtonClick}>
            <label>
              <Input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                required
              />
            </label>
            <Button type="submit" disabled={isLoading}>
              {/* {isLoading ? <AnimatedSvg /> : <SubmitButtonSvg />} */}
            </Button>
            <StyledSvg hasInputValue={inputValue !== ""} />
          </Form>
        </InputBoxStyled>
      </InputAreaStyled>
    </BodyStyled>
  );
}
