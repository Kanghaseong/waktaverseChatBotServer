require("dotenv").config();
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const port = 4000;
const jwt_decode = require('jwt-decode');

let totalToken = 0;
let Gosegu = "";


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

const filePath = path.join(__dirname, "goseguText.txt");

if (fs.existsSync(filePath)) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    Gosegu = data; 
    
    
  });
} else {
  console.error("File not found: goseguText.txt");
} 

var chatArray =  [
  { role: "system", content: Gosegu },
];

app.post("/chat", async (req, res) => {
  
  const inputValue = req.body.inputValue;
 
  chatArray.push({role: "user", content : `${inputValue}`})
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo", 
    temperature:1,
    max_tokens: 1200,
    messages: chatArray,
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
