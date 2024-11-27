const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Hello, who are you?",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Hello, I am your personal note assistant. How can I help you?",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "What are your features?",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "I can help you create, update, delete and search notes. I can also help you with your queries. Summarize your notes, and much more.",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "What is reply length?",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "I keep my replies short and to the point. I can also provide detailed explanations if needed.",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "How do you work?",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "I am powered by Google's Generative AI. I can generate human-like text based on the input you provide.",
        },
      ],
    },
  ],
});

async function askGeminiAI(input) {
  try {
    console.log("Sending message to Gemini AI...");

    const result = await chatSession.sendMessage(input);
    console.log("Received response from Gemini AI...");
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.log(error);
  }
}

module.exports = askGeminiAI;