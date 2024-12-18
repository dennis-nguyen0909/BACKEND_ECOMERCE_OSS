const { OpenAI } = require("openai");

const fs = require("fs");

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

const runAssistant = async () => {
  const assistant = await openai.beta.assistants.create({
    name: "Levent Shop",
    instructions: "Xin chào tôi là trợ lý chat cho shop levent!",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4-turbo-preview",
  });
  const thread = await openai.beta.threads.create();
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: "Shop bạn gồm những gì?",
  });
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    instructions: "Vui lòng",
  });
  console.log(run);
};

module.exports = runAssistant;
