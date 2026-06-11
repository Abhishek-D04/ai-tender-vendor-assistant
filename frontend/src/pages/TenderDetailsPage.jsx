import { useState } from "react";
import api from "../services/api";

export default function TenderDetailsPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

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

      setMessage(
        `Upload Successful: ${response.data.file}`
      );
    } catch (error) {
      setMessage("Upload Failed");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Tender Details
      </h1>

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
            Electrical Equipment Procurement
          </p>

          <p>
            <strong>Deadline:</strong>
            15 Jun 2026
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Upload Tender PDF
        </h2>

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Upload Document
        </button>

        {message && (
          <p className="mt-4 font-medium">
            {message}
          </p>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          AI Analysis Results
        </h2>

        <p className="text-gray-500">
          No analysis available yet.
        </p>
      </div>
    </div>
  );
}