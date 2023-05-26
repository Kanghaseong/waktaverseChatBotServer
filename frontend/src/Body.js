import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const BodyStyled = styled.div`
  display: flex;
  flex: 6.5;
  background-color: #e4dccf;
  flex-direction: column;
  text-align: center;
  
`;

const UserInputAreaStyled = styled.div`
  display: flex;
  background-color: #615645;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
  

`;

const UserInputBoxStyled = styled.div`
  background-color: #bec497;
  height: 20vh;

`;
const TextAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #946a6d;
  overflow: auto;
  height: 60vh;

`;
const TextStyled = styled.div`
  background-color: #946a6d;
`;
export default function Body() {
  const [contents, setcontents] = useState([
    "안녕하세요 이것은 테스트용입닏.",
    "안녕하세요 이것은 테스트용입닏.",
    "안녕하세요 이것은 테스트용입닏.",
    "안녕하세요 이것은 테스트용입닏.",
    "안녕하세요 이것은 테스트용입닏.",
    "안녕하세요 이것은 테스트용입닏.",

  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  axios.defaults.withCredentials = true;

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  const handleButtonClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        apiEndpoint,
        { inputValue },
        { withCredentials: true }
      );
      const newContents = [...contents, inputValue, response.data];
      setcontents(newContents);
      setInputValue("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BodyStyled>
      <TextAreaStyled>
        {isLoading && <p>Loading...</p>}
        {contents.map((content, index) => (
          <TextStyled key={index}>{content}</TextStyled>
        ))}
      </TextAreaStyled>
      <UserInputAreaStyled>
        <UserInputBoxStyled>
          <form onSubmit={handleButtonClick}>
            <label>
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
            </label>
            <button type="submit" disabled={isLoading}>
              전송
            </button>
          </form>
        </UserInputBoxStyled>
      </UserInputAreaStyled>
    </BodyStyled>
  );
}
