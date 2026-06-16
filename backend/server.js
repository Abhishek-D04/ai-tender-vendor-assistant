const express = require("express");
const cors = require("cors");
const multer = require("multer");

const fs = require("fs");
const pdfParse = require("pdf-parse");



const path = require("path");

const app = express();

const {
  analyzeTender,
  compareVendors,
} = require("./services/aiService");

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.json({
    message: "AI Tender Backend Running",
  });
});

app.post(
  "/upload",
  upload.single("tenderFile"),
  (req, res) => {
    res.json({
      success: true,
      file: req.file.filename,
    });
  }
);

const PORT = 5000;

app.post("/extract-text", async (req, res) => {
  try {
    const { filename } = req.body;

    const filePath = path.join(
      __dirname,
      "uploads",
      filename
    );

    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);

    const extractedText = pdfData.text;

    console.log("Running Gemini Analysis...");

    const aiAnalysis = await analyzeTender(
      extractedText.substring(0, 5000)
    );

    res.json({
      success: true,
      text: extractedText,
      aiAnalysis: aiAnalysis,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to extract text",
    });
  }
});

app.post("/compare-vendors", async (req, res) => {
  try {

    const {
      tenderFile,
      vendorAFile,
      vendorBFile,
      vendorCFile,
    } = req.body;

    const readPdfText = async (filename) => {

      const filePath = path.join(
        __dirname,
        "uploads",
        filename
      );

      const dataBuffer =
        fs.readFileSync(filePath);

      const pdfData =
        await pdfParse(dataBuffer);

      return pdfData.text;
    };

    const tenderText =
      await readPdfText(tenderFile);

    const vendorAText =
      await readPdfText(vendorAFile);

    const vendorBText =
      await readPdfText(vendorBFile);

    const vendorCText =
      await readPdfText(vendorCFile);

    console.log(
      "Running Vendor Comparison..."
    );

    const comparisonResult =
      await compareVendors(
        tenderText,
        vendorAText,
        vendorBText,
        vendorCText
      );

    res.json({
      success: true,
      comparisonResult,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Vendor comparison failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});