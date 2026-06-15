require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

async function analyzeTender(text) {
  try {
    console.log("Attempting Gemini Analysis...");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert procurement analyst.

Analyze the following tender document and provide:

1. Tender Summary
2. Key Requirements
3. Compliance Requirements
4. Risk Factors
5. Vendor Recommendation Criteria

Tender Document:

${text.substring(0, 5000)}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    console.log("Gemini Analysis Successful");

    return response.text();

  } catch (error) {

    console.log(
      "Gemini unavailable. Using fallback analysis."
    );

    console.error(error.message);

    const preview = text
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 800);

    return `
# Tender Summary

The tender document has been successfully uploaded and processed.

The system was unable to connect to Gemini AI, so a fallback analysis has been generated using the extracted tender content.

# Tender Content Preview

${preview}

# Key Requirements

• Review all technical specifications mentioned in the tender.

• Verify eligibility criteria before bid submission.

• Ensure all mandatory supporting documents are attached.

• Confirm compliance with submission deadlines.

• Review commercial and technical bid conditions.

# Compliance Requirements

• Company Registration Certificate.

• GST Registration Certificate.

• PAN Details.

• Financial Statements.

• Experience Certificates.

• Any other tender-specific compliance documents.

# Risk Factors

• Missing mandatory documentation.

• Failure to satisfy eligibility requirements.

• Incorrect technical specifications.

• Delayed submission.

• Non-compliance with tender conditions.

# Vendor Recommendation Criteria

• Technical capability and expertise.

• Relevant project experience.

• Financial stability.

• Competitive pricing.

• Compliance with all tender requirements.

# System Status

AI Engine: Fallback Mode

Reason: Gemini API temporarily unavailable.

Recommendation: Retry analysis later for full AI-powered insights.
`;
  }
}

module.exports = {
  analyzeTender,
};