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
    {
      role: "user",
      parts: [
        {
          text: "What is your purpose?",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "I am here to help you with your notes and queries. I can generate human-like text based on the input you provide.",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "What is the format of notes?",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "The format of notes is: Title, Description & Tags. The Title has the length of 100 characters, Description has the length of 1000 characters and Tags have the length of 100 characters.",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Create a note on the topic of AI",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "### Title: AI\n\n**Description:**\n\nArtificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning (the acquisition of information and rules for using the information), reasoning (using rules to reach approximate or definite conclusions) and self-correction. Particular applications of AI include expert systems, speech recognition and machine vision.\n\n**Tags:** AI, Machine Learning, Deep Learning",
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
