import { useState } from "react";
import api from "../services/api";
import jsPDF from "jspdf";

export default function TenderDetailsPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [vendorA, setVendorA] = useState(null);
const [vendorB, setVendorB] = useState(null);
const [vendorC, setVendorC] = useState(null);
const [comparisonResult, setComparisonResult] =
  useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("tenderFile", file);

    try {
      const response = await api.post(
        "/upload",
        formData
      );

      setUploadedFile(response.data.file);

      setMessage(
        `Upload Successful: ${response.data.file}`
      );
    } catch (error) {
      console.error(error);
      setMessage("Upload Failed");
    }
  };

  const handleExtract = async () => {
    if (!uploadedFile) {
      setMessage("Upload PDF first.");
      return;
    }

    try {
      const response = await api.post(
        "/extract-text",
        {
          filename: uploadedFile,
        }
      );

      console.log(response.data);

      setExtractedText(response.data.text);
      setAiAnalysis(response.data.aiAnalysis);

      setMessage(
        "Tender analysis completed successfully."
      );
    } catch (error) {
      console.error(error);
      setMessage("Text extraction failed.");
    }
  };

 const downloadReport = () => {
  if (!aiAnalysis) {
    setMessage("No analysis available.");
    return;
  }

  const doc = new jsPDF();

  const pageWidth = 170;
  const pageHeight = 280;

  doc.setFontSize(18);
  doc.text("AI Tender Analysis Report", 20, 20);

  doc.setFontSize(11);

  const lines = doc.splitTextToSize(
    aiAnalysis,
    pageWidth
  );

  let y = 35;

  lines.forEach((line) => {
    if (y > pageHeight) {
      doc.addPage();
      y = 20;
    }

    doc.text(line, 20, y);
    y += 7;
  });

  doc.save("Tender-Analysis-Report.pdf");
};

  return (
    <div className="space-y-6">

      {/* Page Title */}
      <h1 className="text-3xl font-bold">
        Tender Details
      </h1>

      {/* Tender Information */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Tender Information
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Tender ID:</strong> TEN-001
          </p>

          <p>
            <strong>Status:</strong> Open
          </p>

          <p>
            <strong>Title:</strong>
            {" "}
            Electrical Equipment Procurement
          </p>

          <p>
            <strong>Deadline:</strong>
            {" "}
            15 Jun 2026
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Upload Tender PDF
        </h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="border p-2 rounded w-full"
        />

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Upload Document
          </button>

          <button
            onClick={handleExtract}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Extract Text
          </button>
        </div>

        {message && (
          <p className="mt-4 font-medium text-blue-600">
            {message}
          </p>
        )}
      </div>
      {/* Vendor Documents */}
<div className="bg-white p-6 rounded-xl shadow">
  <h2 className="text-xl font-semibold mb-4">
    Vendor Proposal Documents
  </h2>

  <div className="space-y-4">

    <div>
      <label className="block mb-2 font-medium">
        Vendor A Proposal
      </label>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setVendorA(e.target.files[0])
        }
        className="border p-2 rounded w-full"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">
        Vendor B Proposal
      </label>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setVendorB(e.target.files[0])
        }
        className="border p-2 rounded w-full"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium">
        Vendor C Proposal
      </label>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setVendorC(e.target.files[0])
        }
        className="border p-2 rounded w-full"
      />
    </div>

    <button
  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
>
  Compare Vendors
</button>

  </div>
</div>

      {/* AI Analysis Results */}
      <div className="bg-white p-6 rounded-xl shadow">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            AI Analysis Results
          </h2>

          <button
            onClick={downloadReport}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Download Report
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto border rounded p-4 bg-gray-50 whitespace-pre-wrap">
          {aiAnalysis ||
            "No AI analysis available yet."}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
  <h2 className="text-xl font-semibold mb-4">
    Vendor Evaluation Results
  </h2>

  <div className="max-h-96 overflow-y-auto border rounded p-4 bg-gray-50 whitespace-pre-wrap">
    {comparisonResult ||
      "No vendor comparison available yet."}
  </div>
</div>

      {/* Extracted PDF Text */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Extracted PDF Text
        </h2>

        <div className="max-h-96 overflow-y-auto border rounded p-4 bg-gray-50 whitespace-pre-wrap">
          {extractedText ||
            "No text extracted yet."}
        </div>
      </div>

    </div>
  );
}