import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const BodyStyled = styled.div`
  display: flex;
  flex: 6.5;
  background-color: #EEE9DA;
  flex-direction: column;
  text-align: center;
  
`;

const UserInputAreaStyled = styled.div`
  display: flex;
  background-color: #BDCDD6;
  flex-direction: column;
  justify-content: flex-end;
  height: 20vh;
  
`;

const UserInputBoxStyled = styled.div`
  background-color: #BDCDD6;
  height: 8vh;
  

`;
const TextAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #EEE9DA;
  overflow: auto;
  height: 100vh;

`;
const TextStyled = styled.div`
  background-color: #d1ccbc;
`;
export default function Body() {
  const [contents, setcontents] = useState([]);
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
