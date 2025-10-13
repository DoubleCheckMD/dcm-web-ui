import React, { useState } from "react";
import HumanProblemsModal from "./HumanProblemsModal";
import axios from "axios";
import UserProfileHeader from "../components/UserProfileHeader";
import useFetchUser from "../utils/useFetchUser";


// Modern back-to-home button (merge into this file)
const BackToHomeButton = ({ to = "/" }) => {
  const goHome = (e) => {
    e.preventDefault();
    // Prefer SPA navigation if your app/router provides it; fallback to full navigation
    try {
      // If you're using react-router, replace this with: const navigate = useNavigate(); navigate(to);
      window.location.href = to;
    } catch {
      window.location.href = to;
    }
  };
   return (
    <button
      onClick={goHome}
      aria-label="Back to home"
      className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-md hover:from-indigo-600 hover:to-purple-600 transition focus:outline-none focus:ring-2 focus:ring-indigo-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
      </svg>
      <span className="font-medium">Back to Home</span>
    </button>
  );
};

export default function TellyConsultantsPage() {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);
  const [problemDetails, setProblemDetails] = useState("");
  const [previousHistory, setPreviousHistory] = useState("");
  const [comorbidities, setComorbidities] = useState("");
  const user = useFetchUser();


  const handleComorbiditiesChange = (e) => {
    setComorbidities(e.target.value);
  };

   const handleProblemDetailsChange = (e) => {
    setProblemDetails(e.target.value);
  };

  const handlePreviousHistoryChange = (e) => {
    setPreviousHistory(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
   setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // build payload
    const payload = {
      ...formData,
      problemDetails: problemDetails || "",
      comorbidities: comorbidities || "",
      previousHistory: previousHistory || "",
    };

    const form = new FormData();
    Object.keys(payload).forEach((key) => {
      const val = payload[key];
      if (val !== undefined && val !== null && val !== "") {
        form.append(key, val);
      }
    });

    files.forEach((file) => form.append("files", file));

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3000/tellyConsultant", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Success:", response.data);
        handleReset();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleReset = () => {
    setFormData({});
    setFiles([]);
    setComorbidities("");
    setProblemDetails("");
    setPreviousHistory("");
  };

  // const handleRemoveFile = (index) => {
  //   const newFiles = [...files];
  //   newFiles.splice(index, 1);
  //   setFiles(newFiles);
  // };

   const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <UserProfileHeader user={user} />
      {/* <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
        <h2 className="text-3xl font-bold text-center mb-6">Telly Consultant</h2> */}

 <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
        {/* Top row: back button and page title */}
        <div className="flex items-center justify-between mb-4">
          <BackToHomeButton to="/" />
          <h2 className="text-2xl font-semibold text-gray-700">Telly Consultant</h2>
        </div>


        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Problem Details Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Problem Details</label>
            <textarea
              name="problemDetails"
              value={problemDetails}
              onChange={handleProblemDetailsChange}
              className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter any more medical conditions..."
            />
          </div>


          {/* Comorbidities Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Comorbidities</label>
            <textarea
              name="comorbidities"
              value={comorbidities}
              onChange={handleComorbiditiesChange}
              className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter any more about comorbidities medical conditions..."
            />
          </div>

           {/* Previous History Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Previous History</label>
            <textarea
              name="previousHistory"
              value={previousHistory}
              onChange={handlePreviousHistoryChange}
              className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter any existing medical conditions..."
            />
          </div>

         
          {/* File Upload Section */}
          <div
            className="p-4 border-2 border-dashed rounded-lg text-center bg-gray-50"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p className="text-gray-500">Drag & drop files here or click to upload</p>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="block cursor-pointer p-2 bg-blue-100 text-blue-600 mt-2 rounded-lg"
            >
              Browse Files
            </label>
            {files.length > 0 && (
              <ul className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit and Reset Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 shadow"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
