require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
  try {
    console.log("API Key Exists:",
      process.env.GEMINI_API_KEY ? "YES" : "NO"
    );

    console.log(
      "Key Starts With:",
      process.env.GEMINI_API_KEY.substring(0, 10)
    );

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(
      "Reply with only the word SUCCESS"
    );

    console.log(
      await result.response.text()
    );

  } catch (error) {
    console.error(error);
  }
}

testGemini();