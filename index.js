require("dotenv").config();
const express = require("express");
const fs = require("fs");
const app = express();
const port = 4000;
const cors = require('cors');

const corsOptions = {
    origin: 'https://8f76a677.waktaverse-chatbot.pages.dev/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));
app.use(express.json())

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

let Gosegu = "";

fs.readFile("goseguText.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  Gosegu = data;
});

app.post("/chat", async (req, res) => {
  const inputValue = req.body.inputValue;
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: Gosegu },
      { role: "user", content: `${inputValue}` },
    ],
  });
  console.log(completion.data.choices[0].message.content);

  res.send(completion.data.choices[0].message.content);
});

app.get("/", (req, res)=> {
  res.send("hi")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
