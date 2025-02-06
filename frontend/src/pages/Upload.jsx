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

 
   const [conversations, setConversations] = useState([
    {
      id: 0,
      question: "",
      answer: "",
      subQuestions: [],}
  ]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const handleQuestionSubmit = async (parentId = null, questionText = question) => {
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

      // const formData = new FormData();
      // formData.append("question", question);
      // formData.append("file", files[0]); // Sending the first uploaded file
  
      // const res = await axios.post("http://localhost:3000/ask-ai", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      const res = await axios.post("http://localhost:3000/ask-ai", {
        question: questionText,
        parentId: parentId // Pass parentId if it's a follow-up
      });

    // Log the API response to check the returned answer
    console.log("API Response:", res.data);


      const newResponse = {
        id: res.data.id || new Date().getTime(), // Use timestamp if ID is missing
        question: questionText,
        answer: res.data.aiResponse,
        parentId: parentId || null, // Link to previous question if it's a follow-up
        subQuestions: [],
      };

      setConversations((prevConversations) => {
        if (parentId === null) {
          return [ newResponse, ...prevConversations]; // New conversation
        }
        return prevConversations.map((conv) =>
          conv.id === parentId
            ? { ...conv, subQuestions: [newResponse, ...conv.subQuestions] }
            : conv
        );
      });  

    setQuestion(""); // Clear input after submission
   
    } catch (error) {
      console.error("GPT API Error:", error);
     
      setResponse("Error fetching response.");
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
          <div className="w-1/2 border p-4 bg-white rounded-lg">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about the file..."
            />
            <button 
              disabled={fetching}
             // type="submit" 
              className="mt-2" 
              //onClick={handleQuestionSubmit} 
              onClick={() => handleQuestionSubmit(null)}
              >
              {fetching ? "Fetching AI Reponse" : "Send Question"}
            </button>
            <div className="mt-4 p-2 border rounded-lg bg-gray-50">
              {/* {response} */}
              {/* Render conversations */}
    {renderConversations(conversations)}
             
            </div>
             
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
