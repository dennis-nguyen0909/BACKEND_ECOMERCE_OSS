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
const { dockStart } = require("@nlpjs/basic");
async function nodeNLP(message) {
  const dock = await dockStart({ use: ["Basic"] });
  const nlp = dock.get("nlp");
  nlp.addLanguage("en");
  nlp.addLanguage("vi");
  // Adds the utterances and intents for the NLP
  nlp.addDocument("en", "Xin chào !", "greetings.hello");
  nlp.addDocument("en", "Chào bạn ", "greetings.hello");
  nlp.addDocument("en", "Chào  ", "greetings.hello");
  nlp.addDocument("en", "chào  ", "greetings.hello");
  nlp.addDocument("en", "Hello", "greetings.hello");
  nlp.addDocument(
    "en",
    "Cửa hàng có bán giày sneaker nào của Adidas không?",
    "greetings.adidas"
  );

  await nlp.train();
  const response = await nlp.process("vi", message);
  return response.answer;
}
module.exports = { questionAI, nodeNLP };
