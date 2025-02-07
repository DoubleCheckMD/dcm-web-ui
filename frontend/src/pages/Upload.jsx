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
  const [responses, setResponses] = useState([]);
  const [conversations, setConversations] = useState([]);


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

    if (files.
      length === 0) {
      alert("Please upload a file first");
      return;
    }
   
    try {
      setFetching(true);
      const res = await axios.post("http://localhost:3000/ask-ai", { question });

      const newResponse = {
        id: new Date().getTime(),
        question,
        answer: res.data.aiResponse || "No response",
      };

      setConversations((prev) => [...prev, newResponse]);
      setQuestion("");
   
    } catch (error) {
      console.error("GPT API Error:", error);
     
    } finally {
      setFetching(false);
    }
  };

// Recursive function to render threaded Q&A
const renderConversations = (convos, parentId = null) => {
  return convos.map((conv) => (
    <div key={conv.id} className=" rounded-lg bg-gray-50 mt-2">
      <div className="flex items-center">
        <span className="font-bold">{conv.question}</span>
      </div>
      <div className="ml-2">{conv.answer}</div>
      <div className="ml-2">{renderConversations(conv.subQuestions, conv.id)}</div>
    </div>
  ));
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
          {/* Input Box */}

          {/* Right Section - Chat UI */}
          <div className="w-1/2 flex flex-col p-6 bg-white shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Chat with AI</h2>
            <div className="flex-1 overflow-auto space-y-4 p-4 border rounded-lg bg-gray-50 h-[500px]">
              {conversations.map((conv) => (
                <div key={conv.id} className="flex flex-col space-y-2">
                {conv.question && (
                  <div className="flex justify-end">
                    <div className="bg-gray-500 text-black p-3 rounded-lg max-w-xs text-right">
                      {conv.question}
                    </div>
                  </div>
                )}
                {conv.answer && (
                  <div className="flex justify-start">
                    <div className="bg-gray-300 text-black p-3 rounded-lg max-w-xs text-left">
                      {conv.answer}
                    </div>
                  </div>
                )}
              </div>
              ))}
              {fetching && <p className="text-gray-500">AI is thinking...</p>}
            </div>
            <div className="mt-4 flex">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                placeholder="Ask a question..."
              />
              <button
                onClick={handleQuestionSubmit}
                className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
                disabled={fetching}
              >
                {fetching ? "Thinking..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
