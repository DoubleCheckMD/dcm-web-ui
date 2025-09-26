import React, { useState } from "react";
import HumanProblemsModal from "./HumanProblemsModal";
import axios from "axios";
import UserProfileHeader from "../components/UserProfileHeader";
import useFetchUser from "../utils/useFetchUser";

export default function TellyConsultantsPage() {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);
  const [isHumanProblemsModalOpen, setIsHumanProblemsModalOpen] = useState(false);
  const [bodyProblems, setBodyProblems] = useState([]);
  const [comorbidities, setComorbidities] = useState("");
  const user = useFetchUser();

  const handleSaveBodyProblems = (data) => {
    setBodyProblems(data);
  };

  const handleComorbiditiesChange = (e) => {
    setComorbidities(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = {
      ...formData,
      selectedBodyParts: bodyProblems.selectedBodyParts?.join(", "),
      problemDetails: bodyProblems.problemDetails,
      comorbidities: comorbidities,
    };

    const form = new FormData();
    for (const key in formDataToSend) {
      form.append(key, formDataToSend[key]);
    }
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
    setBodyProblems({ selectedBodyParts: [], problemDetails: "" });
    setComorbidities("");
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const openHumanProblemsModal = () => {
    setIsHumanProblemsModalOpen(true);
  };

  const closeHumanProblemsModal = () => {
    setIsHumanProblemsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <UserProfileHeader user={user} />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
        <h2 className="text-3xl font-bold text-center mb-6">Telly Consultant</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Comorbidities Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Comorbidities</label>
            <textarea
              name="comorbidities"
              value={comorbidities}
              onChange={handleComorbiditiesChange}
              className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter any existing medical conditions..."
            />
          </div>

          {/* Patient's Complaint/Problems Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Patient's Complaint/Problems
            </label>
            <button
              type="button"
              onClick={openHumanProblemsModal}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow"
            >
              Add Body Problems
            </button>
          </div>

          {/* Human Problems Modal */}
          {isHumanProblemsModalOpen && (
            <HumanProblemsModal
              onClose={closeHumanProblemsModal}
              onSave={handleSaveBodyProblems}
            />
          )}

          {bodyProblems.selectedBodyParts?.length > 0 && (
            <div className="p-4 bg-gray-50 border rounded-lg">
              <h3 className="font-semibold">Body Problems:</h3>
              <p>
                <strong>Parts:</strong> {bodyProblems.selectedBodyParts.join(", ")}
              </p>
              <p>
                <strong>Details:</strong> {bodyProblems.problemDetails}
              </p>
            </div>
          )}

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
