require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const helmet = require("helmet");
const port = 4001;
const path = require("path");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

let promptGosegu = null;

try {
  promptGosegu = fs.readFileSync("goseguText.txt", "utf8");
} catch (err) {
  console.error(err);
}

app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
  cors({
    origin: ["https://wakgpt.xyz", "http://localhost:3000"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  req.promptGosegu = promptGosegu;
  next();
});

app.post("/chat", async (req, res) => {
  const inputValue = req.body.inputValue;
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: promptGosegu },
      { role: "user", content: inputValue },
    ],
  });
  console.log("User Input:", inputValue);
  console.log("API Response:", completion.data.choices[0].message.content);
  res.send(completion.data.choices[0].message.content);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
