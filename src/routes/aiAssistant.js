const express = require("express");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai");
const User = require("../models/user");
const router = express.Router();

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI Assistant Route
router.post("/ai-assistant", async (req, res) => {
  const { message } = req.body;

  //  Validate request
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  let userId = null;
  let user = null;

  //  Decode token from cookies if available
  try {
    const token = req.cookies?.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId;

      //  Fetch user data from DB
      user = await User.findById(userId).select(
        "firstName lastName skills about"
      );
    }
  } catch (err) {
    console.log("Guest user or invalid token");
  }

  try {
    //  Build user context
    const userContext = user
      ? `User Info → Name: ${user.firstName} ${user.lastName}, Skills: ${
          user.skills?.join(", ") || "N/A"
        }, About: ${user.about || "N/A"}.\n`
      : "";

    //  Call OpenAI with personalization
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 150,
      messages: [
        {
          role: "system",
          content:
            "You are an AI onboarding assistant for a platform called DevTinder. Help users understand features like setting up profiles, finding smart matches, sending connection requests, and collaborating on projects. " +
            (user
              ? "Personalize your answers using the user's profile info provided."
              : "Respond generically if no user data."),
        },
        {
          role: "user",
          content: userContext + message,
        },
      ],
    });

    const reply = chatResponse.choices[0].message.content.trim();
    res.json({ reply });
  } catch (err) {
    console.error("AI Assistant Error:", err.message);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
});

module.exports = router;
