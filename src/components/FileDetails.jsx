import React from "react";
import { useLocation, Link } from "react-router-dom";

const FileDetails = () => {
  const location = useLocation();
  const { file } = location.state || {};

  if (!file) {
    return <p>No file data available.</p>;
  }

  
   // Accept multiple possible property names coming from backend
  const raw = file.data || file.fileData || file.file || "";
  const typeStr = file.type || file.fileType || "";

  // Ensure we have a data:...;base64,... data URL. If backend returned raw base64, wrap it.
  let dataStr = String(raw || "");
  if (dataStr && !dataStr.startsWith("data:")) {
    // assume raw base64 payload -> create data URL using provided mime (fallback to octet-stream)
    const mime = typeStr || "application/octet-stream";
    // if raw already looks like base64 without commas, wrap it
    dataStr = `data:${mime};base64,${dataStr}`;
  }

  // Determine the file type
  const isImage = file.data.startsWith("data:image/");
  const isPDF = file.data.startsWith("data:application/pdf");
  const isDoc =
    file.data.startsWith("data:application/msword") ||
    file.data.startsWith(
      "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
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


//     const handleDocOpen = () => {

//  if (!dataStr.includes(",")) {
//       console.error("No base64 payload available to open document.");
//       return;
//     }

        // Extract the base64 data from the data URL
    //     const base64Data = file.data.split(",")[1];
    //     // Decode the base64 data into a Uint8Array
    //     const byteCharacters = atob(base64Data);
    //     const byteArrays = [];
    
    //     for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    //         const slice = byteCharacters.slice(offset, offset + 512);
    //         const byteNumbers = new Array(slice.length);
    //         for (let i = 0; i < slice.length; i++) {
    //             byteNumbers[i] = slice.charCodeAt(i);
    //         }
    //         const byteArray = new Uint8Array(byteNumbers);
    //         byteArrays.push(byteArray);
    //     }
    
    //    // const blob = new Blob(byteArrays, { type: file.type });
    //        const blob = new Blob(byteArrays, { type: typeStr || "application/octet-stream" });
    //     const blobUrl = URL.createObjectURL(blob);
    //     window.open(blobUrl, "_blank");
    // };


    const handleDownload = () => {
    const url = createBlobUrl();
    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.download = file.filename || "file";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else if (dataStr.startsWith("http")) {
      const a = document.createElement("a");
      a.href = dataStr;
      a.download = file.filename || "file";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      console.error("No downloadable data available");
      alert("Cannot download file: no data available.");
    }
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

      {/* {isPDF && (
        <iframe
          src={file.data}
          title={file.filename}
          className="w-full h-96 border"
        />
      )} */}

        {isPDF && (
        // prefer blob URL for PDF rendering (more reliable than huge data: URLs)
        <iframe
          src={createBlobUrl() || dataStr}
          title={file.filename}
          className="w-full h-96 border"
        />
      )}

      {/* {isDoc && (
        <button
          onClick={handleDocOpen}
          className="text-blue-500 hover:underline"
        >
          Open {file.filename}
        </button>
      )}

      {!isImage && !isPDF && !isDoc && (
        <p className="text-red-500">Unsupported file type.</p>
      )} */}

       {isDoc && (
        <div className="flex flex-col items-center gap-2">
          <button onClick={handleOpen} className="text-blue-500 hover:underline">
            Open {file.filename}
          </button>
          <button onClick={handleDownload} className="text-blue-500 hover:underline">
            Download {file.filename}
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Note: .doc/.docx may not render in-browser — use Download if Open fails.
          </p>
        </div>
      )}

      {!isImage && !isPDF && !isDoc && (
        <div>
          <p className="text-gray-700">Preview not available for this file type.</p>
          <div className="mt-2">
            <button onClick={handleDownload} className="text-blue-500 hover:underline">
              Download {file.filename}
            </button>
          </div>
        </div>
      )}

      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default FileDetails;
