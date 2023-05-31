require("dotenv").config();
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const port = 4000;
const jwt_decode = require('jwt-decode');
const util = require('util');

let totalToken = 0;

app.use(helmet());
app.use(
  cors({
    origin: ["https://wakgpt.xyz","https://waktaversechatbotserver.pages.dev/", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

const { Configuration, OpenAIApi } = require("openai");
const path = require("path");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);



const readFilePromise = util.promisify(fs.readFile);

async function readGoseguFile() {
  const filePath = "goseguText.txt";
  try {
    const data = await readFilePromise(filePath, "utf8");
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

let Gosegu = "";

readGoseguFile().then((data) => {
  Gosegu = data;
});

const chatArray = [{ role: "system", content: "" }];


app.post("/chat", async (req, res) => {
  
  const inputValue = req.body.inputValue;
  chatArray[0].content = Gosegu; 
  chatArray.push({role: "user", content : `${inputValue}`})
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo", 
    temperature:1,
    messages: chatArray, // commit 당시 고세구 학습데이터가 content로 넘어가지않음
  });
  totalToken += completion.data.usage.total_tokens
  console.log(totalToken)
  chatArray.push({ role: "assistant", content : `${completion.data.choices[0].message.content}`})
  console.log(chatArray)
  res.send(completion.data.choices[0].message.content);
});

app.post("/login", (req, res)=>{
  let userJwt = req.headers.authorization;
  const receivedClientId= req.body;

  userJwt = userJwt.split(" ");
  userJwt = userJwt[1];
  userJwt = jwt_decode(userJwt);
  console.log(userJwt)
  console.log(receivedClientId)

  res.send("done!")
})

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
