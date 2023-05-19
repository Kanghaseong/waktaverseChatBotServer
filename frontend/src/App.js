import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [texts, setTexts] = useState([]);
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
      const newTexts = [...texts, inputValue, response.data];
      setTexts(newTexts);
      setInputValue("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="App">
      <h1>고세구 GPT</h1>
      <form onSubmit={handleButtonClick}>
        <label>
          고세구 한테 할 말을 입력하세요
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
      {isLoading && <p>Loading...</p>}
      <ul>
        {texts.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
