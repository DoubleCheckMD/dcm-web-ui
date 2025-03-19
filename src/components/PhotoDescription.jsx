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
   <div className="bg-white rounded-lg shadow p-6">
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

      <div className="notebook-style">
        {/* Table Header */}
        <div className="grid grid-cols-3 gap-4 p-2 bg-gray-100 rounded">
          <div>
            <strong>Filename</strong>
          </div>
          <div>
            <strong>Date</strong>
          </div>
          <div>
            <strong>Category</strong>
          </div>
          {/* <div>
            <strong>Size</strong>
          </div> */}
        </div>

        {/* Table Rows */}
        {displayedPhotos.map((photo, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 p-2 border-b">
            <div>
              <button
                onClick={() => handlePhotoClick(photo)}
                className="text-blue-400 hover:underline"
              >
                {/* {photo.filename || "Unnamed File"} */}
                {trimFilename(photo.filename || "Unnamed File")}
              </button>
            </div>
            <div>{photo.date ? new Date(photo.date).toLocaleString() : "Unknown Date"}</div>
            {/* <div>{photo.size ? `${(photo.size / 1024 / 1024).toFixed(2)} MB` : "Unknown Size"}</div> */}
            <div>{photo.category || "Uncategorized"}</div>
          </div>
        ))}


        {photos.length > 10 && !searchTerm && (
          <button
            onClick={() => navigate("/view-all", { state: { photos } })}
            className="text-blue-400 hover:underline mt-4"
          >
            View All
          </button>
        )}
      </div>
    </div>
  );
};

export default PhotoDescription;
