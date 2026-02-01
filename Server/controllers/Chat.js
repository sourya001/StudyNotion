const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getRelevantChunks } = require("../utils/rag");

const STUDYNOTION_SYSTEM_PROMPT_BASE = `You are the StudyNotion support assistant. Answer only about StudyNotion. If unsure, suggest visiting the Contact page.

Current features: Signup (OTP verification), Login, Forgot Password, demo account (demo@gmail.com / 12345678) on Signup and Login for users who did not receive OTP or cannot sign in. Dashboard: My Profile, Settings (edit profile, change password, delete account). Students: Enrolled Courses, Cart, Catalog, course details, payment, View Course. Instructors: My Courses (table on desktop, card layout on mobile), Add Course, Edit Course. Contact page for support.

Format and style: Write in short paragraphs. Be straight to the point. Do not use markdown: no asterisks (no ** for bold), no bullet symbols, no headers. Use plain text only so it displays correctly in the chat.`;

const ROLE_CONTEXT = {
  Instructor: `The user is logged in as an Instructor. Tailor answers for instructors: Dashboard (Instructor, My Courses, Add Course, Edit Course), creating and managing courses, sections and subsections. My Courses shows a table on desktop and a card layout on small screens with Edit and Delete. Do not suggest student-only features like Cart or Enrolled Courses unless they ask.`,
  Student: `The user is logged in as a Student. Tailor answers for students: Dashboard (My Profile, Settings, Enrolled Courses), Cart, Catalog, All Courses, course details, payment, View Course for video lessons. Do not suggest instructor-only features like Add Course or My Courses unless they ask.`,
};

exports.chatController = async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      message: "Chat is not configured. Missing GEMINI_API_KEY.",
    });
  }

  const { messages, userRole } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      success: false,
      message: "messages array is required and must not be empty.",
    });
  }

  try {
    const lastMessage = messages[messages.length - 1];
    const isLastUser = lastMessage.role === "user";
    const historyMessages = isLastUser ? messages.slice(0, -1) : messages;
    const lastUserText = isLastUser ? lastMessage.content : "";

    let systemInstruction = STUDYNOTION_SYSTEM_PROMPT_BASE;
    if (userRole && ROLE_CONTEXT[userRole]) {
      systemInstruction += `\n\n${ROLE_CONTEXT[userRole]}`;
    }
    try {
      const relevantChunks = await getRelevantChunks(apiKey, lastUserText, 5);
      if (relevantChunks && relevantChunks.length > 0) {
        const context = relevantChunks.join("\n");
        systemInstruction += `\n\nRelevant information about StudyNotion:\n${context}`;
      }
    } catch (ragErr) {
      console.warn("RAG retrieval failed, using base prompt only:", ragErr.message);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction,
    });

    const history = historyMessages.map((m) => ({
      role: m.role === "model" ? "model" : "user",
      parts: [{ text: m.content || "" }],
    }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastUserText);
    const response = result.response;
    const text = response.text();

    return res.json({
      success: true,
      reply: text || "",
    });
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get reply from chatbot.",
    });
  }
};
