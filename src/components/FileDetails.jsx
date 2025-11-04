import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserProfileHeader from "./UserProfileHeader";
import useFetchUser from "../utils/useFetchUser";

const FileDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useFetchUser();
  const { file, allFiles, currentIndex } = location.state || {};
  
  const [currentFileIndex, setCurrentFileIndex] = useState(currentIndex || 0);
  const [currentFile, setCurrentFile] = useState(file);

  // Initialize with all files if provided
  const files = allFiles || (file ? [file] : []);

  useEffect(() => {
    if (files.length > 0) {
      setCurrentFile(files[currentFileIndex]);
    }
  }, [currentFileIndex, files]);

  if (!currentFile && files.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
        <UserProfileHeader user={user} />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">No file data available.</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 text-accent hover:text-accent-dark dark:hover:text-accent-light transition-colors font-medium inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  
  // Accept multiple possible property names coming from backend
  const raw = currentFile.data || currentFile.fileData || currentFile.file || "";
  const typeStr = currentFile.type || currentFile.fileType || "";

  // Ensure we have a data:...;base64,... data URL. If backend returned raw base64, wrap it.
  let dataStr = String(raw || "");
  if (dataStr && !dataStr.startsWith("data:")) {
    // assume raw base64 payload -> create data URL using provided mime (fallback to octet-stream)
    const mime = typeStr || "application/octet-stream";
    // if raw already looks like base64 without commas, wrap it
    dataStr = `data:${mime};base64,${dataStr}`;
  }

  // Determine the file type
  const isImage = dataStr.startsWith("data:image/");
  const isPDF = dataStr.startsWith("data:application/pdf");
  const isDoc =
    dataStr.startsWith("data:application/msword") ||
    dataStr.startsWith(
      "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) ||
    typeStr.includes("wordprocessingml") ||
    typeStr === "application/msword";

     const createBlobUrl = () => {
    try {
      // get base64 payload part
      const base64 = dataStr.includes(",") ? dataStr.split(",")[1] : dataStr;
      if (!base64) return null;
      const byteCharacters = atob(base64);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, { type: typeStr || "application/octet-stream" });
      return URL.createObjectURL(blob);
    } catch (err) {
      console.error("createBlobUrl error", err);
      return null;
    }
  };

   const handleOpen = () => {
    const url = createBlobUrl();
    if (url) {
      window.open(url, "_blank");
    } else if (dataStr.startsWith("http")) {
      window.open(dataStr, "_blank");
    } else {
      // fallback: trigger download
      handleDownload();
    }
  };



  const handleDownload = () => {
    const url = createBlobUrl();
    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.download = currentFile.filename || "file";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else if (dataStr.startsWith("http")) {
      const a = document.createElement("a");
      a.href = dataStr;
      a.download = currentFile.filename || "file";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      console.error("No downloadable data available");
      alert("Cannot download file: no data available.");
    }
  };

  const handlePrevious = () => {
    if (currentFileIndex > 0) {
      setCurrentFileIndex(currentFileIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentFileIndex < files.length - 1) {
      setCurrentFileIndex(currentFileIndex + 1);
    }
  };
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <UserProfileHeader user={user} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>

          {/* File Navigation */}
          {files.length > 1 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevious}
                disabled={currentFileIndex === 0}
                className="p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
                {currentFileIndex + 1} / {files.length}
              </span>
              <button
                onClick={handleNext}
                disabled={currentFileIndex === files.length - 1}
                className="p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-colors duration-200">
          {/* File Info Header */}
          <div className="bg-gradient-to-r from-accent to-accent-dark px-6 py-4">
            <h1 className="text-xl font-bold text-white mb-1">{currentFile.filename}</h1>
            <p className="text-white/80 text-sm">
              {typeStr || 'Unknown type'} {currentFile.size && `• ${(currentFile.size / 1024).toFixed(1)} KB`}
            </p>
          </div>

          {/* Viewer */}
          <div className="p-6">
            {/* Render content based on file type */}
            {isImage && (
              <div className="flex justify-center bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <img
                  src={dataStr}
                  alt={currentFile.filename}
                  className="max-w-full h-auto max-h-[70vh] object-contain rounded"
                />
              </div>
            )}

            {isPDF && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                <iframe
                  src={createBlobUrl() || dataStr}
                  title={currentFile.filename}
                  className="w-full h-[75vh] border-0"
                />
              </div>
            )}

            {isDoc && (
              <div className="flex flex-col items-center gap-4 py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="text-center mb-4">
                  <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Word Document</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Preview not available in browser</p>
                </div>
                <button 
                  onClick={handleOpen} 
                  className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors shadow-sm font-medium"
                >
                  Open in New Tab
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-500 max-w-md text-center">
                  Note: .doc/.docx files may require a compatible application to view. Use the download button if the file doesn't open.
                </p>
              </div>
            )}

            {!isImage && !isPDF && !isDoc && (
              <div className="flex flex-col items-center gap-4 py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="text-center mb-4">
                  <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Preview not available</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">This file type cannot be displayed in the browser</p>
                </div>
                <button 
                  onClick={handleDownload}
                  className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors shadow-sm font-medium"
                >
                  Download File
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDetails;
