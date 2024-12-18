const { OpenAI } = require("openai");
const fs = require("fs");
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});
async function questionAI(message) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: message }],
    model: "ft:gpt-3.5-turbo-0125:personal::90th0ZTr",
  });
  return completion.choices[0].message.content;
  // console.log(completion.choices[0].message.content);
}

module.exports = { questionAI };
