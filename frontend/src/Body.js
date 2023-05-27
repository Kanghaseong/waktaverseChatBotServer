import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

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
  height: 8vh;
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

export default function Body() {
  const [contents, setContents] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  axios.defaults.withCredentials = true;

  const handleButtonClick = async (event) => {
    if (inputValue) {
      event.preventDefault();
      setContents([...contents, inputValue]);
      setIsLoading(true);
      setInputValue("");
      try {
        const response = await axios.post(
          apiEndpoint,
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
  };

  return (
    <BodyStyled>
      <TextAreaStyled>
        {isLoading && <p>Loading...</p>}
        {contents.map((content, index) => (
          <TextStyled key={index}>{content}</TextStyled>
        ))}
      </TextAreaStyled>
      <InputAreaStyled>
        <InputBoxStyled>
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
        </InputBoxStyled>
      </InputAreaStyled>
    </BodyStyled>
  );
}
