import { useState } from "react";
import api from "../services/api";

export default function TenderDetailsPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [extractedText, setExtractedText] = useState("");

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

      setExtractedText(response.data.text);
    } catch (error) {
      console.error(error);
      setMessage("Text extraction failed.");
    }
  };

  return (
    <div className="space-y-6">
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
            <strong>Title:</strong> Electrical Equipment
            Procurement
          </p>

          <p>
            <strong>Deadline:</strong> 15 Jun 2026
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

      {/* AI Analysis Results */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          AI Analysis Results
        </h2>

        <div className="max-h-96 overflow-y-auto border rounded p-4 bg-gray-50 whitespace-pre-wrap">
          {extractedText ||
            "No analysis available yet."}
        </div>
      </div>
    </div>
  );
}