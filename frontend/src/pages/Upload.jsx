import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Upload.css"; // Import the CSS file
import UserProfileHeader from "../components/UserProfileHeader"; // Import the UserProfileHeader component
import useFetchUser from "../utils/useFetchUser"; // Import the custom hook
import { Document, Page } from "react-pdf";

const Upload = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");
  const user = useFetchUser(); // Use the custom hook to fetch user data
  const [numPages, setNumPages] = useState(null);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [fetching, setFetching] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const handleQuestionSubmit = async () => {
    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    try {
      setFetching(true);
      const res = await axios.post("http://localhost:3000/ask-ai", {
        question,
      });

      setResponse(res.data.aiResponse);
    } catch (error) {
      console.error("GPT API Error:", error);
      setResponse("Error fetching response.");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setError("No files selected");
      return;
    }
   
    const formData = new FormData();
    files.forEach((file) => formData.append("photos", file));

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response); // Log the response
      if (response.status === 200) {
        console.log("File uploaded successfully");
        setFiles([]);
        setPreviews([]);
        setError("");
        navigate("/success"); // Navigate to success page
      } else {
        console.error("Upload failed with status:", response.status);
      }
    } catch (err) {
      console.log(err.message);
      setError("Error uploading files");
      setUploadStatus("");
    }
  };

  return (
    <div>
      <UserProfileHeader user={user} />{" "}
      {/* Use the UserProfileHeader component */}
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="mb-4 flex items-center space-x-4">
            <input type="file" onChange={handleFileChange} />
            <button type="submit" className="upload-button">
              LOAD FILE
            </button>
          </div>
        </form>
        <div className="flex w-full max-w-4xl space-x-6">
          <div className="w-1/2 border p-2 bg-white rounded-lg">
            {previews.length > 0 && (
              <div>
                {previews.map((preview, index) =>
                  files[index].type === "application/pdf" ? (
                    <Document
                      key={index}
                      file={preview}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      {Array.from(new Array(numPages), (el, pageIndex) => (
                        <Page key={pageIndex} pageNumber={pageIndex + 1} />
                      ))}
                    </Document>
                  ) : files[index].type.startsWith("image") ? (
                    <img
                      key={index}
                      src={preview}
                      alt="Uploaded Preview"
                      className="w-full h-auto"
                    />
                  ) : (
                    <p key={index} className="text-sm text-gray-600">
                      Uploaded file: {files[index].name}
                    </p>
                  )
                )}
              </div>
            )}
          </div>
          <div className="w-1/2 border p-4 bg-white rounded-lg">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about the file..."
            />
            <button 
              disabled={fetching}
              type="submit" 
              className="mt-2" 
              onClick={handleQuestionSubmit} 
              // className={'${fetching ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 fous:outline-none focuse:ring-2 focus:ring-blue-600 focus:ring-opacity-50"} mt-4 px-4 py-2 text-white rounded-md'}
              >
              {fetching ? "Fetching AI Reponse" : "Send Question"}
            </button>
            <div className="mt-4 p-2 border rounded-lg bg-gray-50">
              {response}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
