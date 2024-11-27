const express = require("express");
const askGeminiAI = require("../utils/gemini");
const { fetchUser } = require("../middlewares");
const Notes = require("../models/Notes");
const catchAsync = require("../utils/catchAsync");

const router = express.Router();

router.post(
  "/ask",
  fetchUser,
  catchAsync(async (req, res) => {
    const { question } = req.body;
    const { id } = req.user;
    console.log(question);
    console.log(id);
    const notes = await Notes.find({ user: id });

    const notesText = notes
      .map((note, i) => `Note ${i} -> ${note.title}: ${note.description}`)
      .join("\n");
    console.log(notesText);
    const input = `${notesText}\n\nQuestion: ${question}`;

    const response = await askGeminiAI(input);
    console.log(response);
    res.status(200).json({ success: true, response });
  })
);

module.exports = router;
