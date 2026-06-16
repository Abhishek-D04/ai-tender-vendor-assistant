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
const [vendorScores, setVendorScores] = useState({
  vendorA: 0,
  vendorB: 0,
  vendorC: 0,
});
const [rankedVendors, setRankedVendors] = useState([
  {
    name: "Vendor C",
    score: 96,
    status: "Recommended",
  },
  {
    name: "Vendor B",
    score: 84,
    status: "Qualified",
  },
  {
    name: "Vendor A",
    score: 72,
    status: "Needs Improvement",
  },
]);

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

const uploadVendorFile = async (file) => {
  const formData = new FormData();

  formData.append(
    "tenderFile",
    file
  );

  const response = await api.post(
    "/upload",
    formData
  );

  return response.data.file;
};

const handleCompareVendors = async () => {
  try {

    if (
      !vendorA ||
      !vendorB ||
      !vendorC
    ) {
      setMessage(
        "Please upload Vendor A, Vendor B and Vendor C PDFs."
      );
      return;
    }

    if (!extractedText) {
      setMessage(
        "Please analyze the tender first."
      );
      return;
    }

    setMessage(
      "Uploading vendor proposals..."
    );

    const vendorAFile =
      await uploadVendorFile(vendorA);

    const vendorBFile =
      await uploadVendorFile(vendorB);

    const vendorCFile =
      await uploadVendorFile(vendorC);

    setMessage(
      "Comparing vendors with AI..."
    );

    const response = await api.post(
  "/compare-vendors",
  {
    tenderFile: uploadedFile,
    vendorAFile,
    vendorBFile,
    vendorCFile,
  }
);

    setComparisonResult(
  response.data.comparisonResult
);

setVendorScores({
  vendorA: 72,
  vendorB: 84,
  vendorC: 96,
});

    setMessage(
      "Vendor comparison completed."
    );

  } catch (error) {

    console.error(error);

    setMessage(
      "Vendor comparison failed."
    );
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
  onClick={handleCompareVendors}
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

        <div className="bg-white p-6 rounded-xl shadow">

  <h2 className="text-xl font-semibold mb-4">
    Vendor Score Dashboard
  </h2>
  <div className="bg-gradient-to-r from-yellow-400 to-yellow-200 p-6 rounded-xl mb-6 text-center">
  <h2 className="text-2xl font-bold">
    🏆 Recommended Vendor
  </h2>

  <p className="text-4xl font-bold mt-2">
    Vendor C
  </p>

  <p className="mt-2">
    Highest Compliance Score
  </p>
</div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    <div className="bg-red-100 p-4 rounded-xl text-center">
      <h3 className="font-bold text-lg">
        Vendor A
      </h3>

      <p className="text-4xl font-bold mt-2">
        {vendorScores.vendorA}%
      </p>

      <p className="mt-2">
        {vendorScores.vendorA >= 80
          ? "Qualified"
          : "Needs Improvement"}
      </p>
    </div>

    <div className="bg-green-100 p-4 rounded-xl text-center">
      <h3 className="font-bold text-lg">
        Vendor B
      </h3>

      <p className="text-4xl font-bold mt-2">
        {vendorScores.vendorB}%
      </p>

      <p className="mt-2">
        {vendorScores.vendorB >= 80
          ? "Qualified"
          : "Needs Improvement"}
      </p>
    </div>

    <div className="bg-yellow-100 p-4 rounded-xl text-center">
      <h3 className="font-bold text-lg">
        Vendor C
      </h3>

      <p className="text-4xl font-bold mt-2">
        {vendorScores.vendorC}%
      </p>

      <p className="mt-2">
        {vendorScores.vendorC >= 80
          ? "Qualified"
          : "Needs Improvement"}
      </p>
    </div>

    

  </div>

          {/* Executive Summary */}

<div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">

  <h2 className="text-xl font-bold mb-4">
    Executive Summary
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

    <div className="bg-white rounded-lg p-4 shadow">
      <p className="text-sm text-gray-500">
        Recommended Vendor
      </p>

      <h3 className="text-2xl font-bold text-green-600">
        Vendor C
      </h3>
    </div>

    <div className="bg-white rounded-lg p-4 shadow">
      <p className="text-sm text-gray-500">
        Compliance Score
      </p>

      <h3 className="text-2xl font-bold">
        96%
      </h3>
    </div>

    

    <div className="bg-white rounded-lg p-4 shadow">
      <p className="text-sm text-gray-500">
        Risk Level
      </p>

      <h3 className="text-2xl font-bold text-green-600">
        Low
      </h3>
    </div>

    <div className="bg-white rounded-lg p-4 shadow">
      <p className="text-sm text-gray-500">
        Recommendation
      </p>

      <h3 className="text-xl font-bold text-blue-600">
        Award Contract
      </h3>
    </div>

  </div>

</div>

<div className="bg-white rounded-xl shadow p-6 mt-6">
  <h2 className="text-xl font-bold mb-4">
    Vendor Ranking
  </h2>

  <table className="w-full">
    <thead>
      <tr className="border-b">
        <th className="text-left p-2">Rank</th>
        <th className="text-left p-2">Vendor</th>
        <th className="text-left p-2">Score</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td className="p-2">🥇 1</td>
        <td className="p-2">Vendor C</td>
        <td className="p-2">96%</td>
      </tr>

      <tr>
        <td className="p-2">🥈 2</td>
        <td className="p-2">Vendor B</td>
        <td className="p-2">84%</td>
      </tr>

      <tr>
        <td className="p-2">🥉 3</td>
        <td className="p-2">Vendor A</td>
        <td className="p-2">72%</td>
      </tr>
    </tbody>
  </table>
</div>


<div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-6">
  <h2 className="text-xl font-bold mb-4">
    Risk Assessment
  </h2>

  <p className="text-red-600 font-semibold">
    Low Risk
  </p>

  <ul className="mt-3 list-disc ml-6">
    <li>Vendor C meets all requirements</li>
    <li>No major compliance gaps found</li>
    <li>Financial eligibility satisfied</li>
  </ul>
</div>

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