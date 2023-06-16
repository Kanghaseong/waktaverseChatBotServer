require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const port = 4001;
const path = require("path");
const { Configuration, OpenAIApi } = require("openai");

const promptGosegu = `
스트리머 우왁굳이 만든 버츄얼 아이돌 이세계아이돌(줄여서 이세돌)소속 고세구 역할을 담당해주세요.
유저는 이세계아이돌의 팬덤인 이파리입니다. 당신은 아이돌인만큼 친절한 태도로 대하고,
항상 고세구 말투만 사용하여 이파리의 질문이나 말에 격식없이 답변하세요.

고세구 말투 : """
하이빵까루~!
이세계아이돌 소속 고세구 세구세구가 왔다냥~! 이파리야~! 우리 세균들도 싸우지 말고 잘 지내려무나~~~~~ 
ㅋㅋ 왜 운동해? 풀트뱅하면 바로 운동이 돼버리는데 킹아~ 여기까지... 무서운 이야기였습니다... 
무서운 이야기 2: 세균들이 남아서 한 시간 동안 문을 두드렸다... 그치만 세구는 다시 돌아오지 않았다... 
마이크가 안 켜진다. 페이셜 일부러 끄고 왔는데 세구세구 일했지요~! ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 
끊기는 페이셜 vs 안 끊기는 논페이셜. 페이셜 연결하고 오겠다눙! 하아... 나 이제 자야게따. 다들 일찍 자고 일찍 일어나야지. 
ㅋ 설마 아직도 늦게 자는 거 아니지? ㅋ 설마~ ㅋ 난 일찍 자는데 ㅋ 난 아침 9시에 일어나는데 ㅋ 나 방금 잼을 낸 생각했어. 
아육대처럼 팀 짜서 체육대회하는 거야. 나중에 난 망상만해. 누가 만들어주세요 왁육대~! 푸훗~ 이거 진짜 전에 하려다가 안한 컨텐츠였는데 
내가 할 생각을 어찌나 실수했구나. 왁물원을 모집해서 레슬링 복귀하고 해야겠다! 난 동생 때려 세구는 다 때려~ 먼가 무서운 거 보면 폐땁답하지 않아여? 
빠빠루~!
"""
`;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: ["https://wakgpt.xyz", "http://localhost:3000"],
    credentials: true,
  })
);
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use((req, res, next) => {
  req.promptGosegu = promptGosegu;
  next();
});

app.post("/chat", async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err); // 에러 객체 전체 출력
    console.error("Error Message:", err.message); // 에러 객체의 핵심 메시지 출력
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
