import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const PhotoDescription = ({ photos, loading }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!photos || photos.length === 0) {
    return <p>No photos available.</p>;
  }

  const photosWithDefaultCategory = photos.map((photo) => ({
    ...photo,
    category: photo.category || "Uncategorized",
  }));

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term) {
      // const results = photos.filter((photo) =>
        const results = photosWithDefaultCategory.filter((photo) =>
        photo.filename.toLowerCase().includes(term.toLowerCase()) ||
      (photo.category && photo.category.toLowerCase().includes(term.toLowerCase()))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handlePhotoClick = (photo) => {
    navigate("/file-details", { state: { file: photo } });
  };

  const displayedPhotos = searchTerm ? searchResults : photos.slice(0, 8);

  const trimFilename = (filename) => {
    if (filename.length > 25) {
      return filename.substring(0, 25) + "...";
    }
    return filename;
  };

  return (
   <div className="border rounded-lg shadow p-6"
   style={{
    backgroundColor: "#f9f9f9",
    border: "1px solid #e0e0e0",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "24px",
    margin: "16px",
   }}>
      <h1 className="text-xl font-bold">Photo Descriptions</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search filenames or categories..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedPhotos.map((photo, index) => (
          <div
            key={index}
            className="border rounded p-4 hover:shadow-md transition-shadow duration-300"
          >
            <button
              onClick={() => handlePhotoClick(photo)}
              className="text-blue-400 hover:underline block mb-2"
            >
              {trimFilename(photo.filename || "Unnamed File")}
            </button>
            <p>
              <strong>Date:</strong>{" "}
              {photo.date ? new Date(photo.date).toLocaleString() : "Unknown Date"}
            </p>
            <p>
              <strong>Category:</strong> {photo.category || "Uncategorized"}
            </p>
          </div>
        ))}
      </div>

      {photos.length > 10 && !searchTerm && (
        <div className="mt-4">
          <button
            onClick={() => navigate("/view-all", { state: { photos } })}
            className="text-blue-400 hover:underline"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

    
export default PhotoDescription;
