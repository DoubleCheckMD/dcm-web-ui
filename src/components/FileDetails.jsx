import React from "react";
import { useLocation, Link } from "react-router-dom";

const FileDetails = () => {
  const location = useLocation();
  const { file } = location.state || {};

  if (!file) {
    return <p>No file data available.</p>;
  }
  // Determine the file type
  const isImage = file.data.startsWith("data:image/");
  const isPDF = file.data.startsWith("data:application/pdf");
  const isDoc =
    file.data.startsWith("data:application/msword") ||
    file.data.startsWith(
      "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    const handleDocOpen = () => {
        // Extract the base64 data from the data URL
        const base64Data = file.data.split(",")[1];
        // Decode the base64 data into a Uint8Array
        const byteCharacters = atob(base64Data);
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
    
        const blob = new Blob(byteArrays, { type: file.type });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, "_blank");
    };
    
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">File Details</h1>
      <p className="mb-4">File Name: {file.filename}</p>
      {/* <img
        src={file.data} // Use the base64-encoded image data directly
        alt={file.filename}
        className="max-w-full h-auto"
      /> */}

      {/* Render content based on file type */}
      {isImage && (
        <img
          src={file.data} // Use the base64-encoded image data directly
          alt={file.filename}
          className="max-w-full h-auto"
        />
      )}

      {isPDF && (
        <iframe
          src={file.data}
          title={file.filename}
          className="w-full h-96 border"
        />
      )}

      {isDoc && (
        <button
          onClick={handleDocOpen}
          className="text-blue-500 hover:underline"
        >
          Open {file.filename}
        </button>
      )}

      {!isImage && !isPDF && !isDoc && (
        <p className="text-red-500">Unsupported file type.</p>
      )}

      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default FileDetails;
