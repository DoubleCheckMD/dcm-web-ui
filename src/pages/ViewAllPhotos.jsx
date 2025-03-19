import React, { useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import debounce from "lodash/debounce"; // Install lodash: npm install lodash

const ViewAllPhotos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const photos = location.state?.photos || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const photosWithDefaultCategory = photos.map((photo) => ({
    ...photo,
    category: photo.category || "Uncategorized",
  }));

  const filterPhotos = useCallback(
    (term) => {
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
    },
    [photos]
  );

  const debouncedSearch = useMemo(
    () => debounce(filterPhotos, 300),
    [filterPhotos]
  );


  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handlePhotoClick = (photo) => {
    navigate("/file-details", { state: { file: photo } });
  };

  const displayedPhotos = searchTerm ? searchResults : photos;

  

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Photos</h1>
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
        {/* {displayedPhotos.map((photo, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 p-2 border-b">
            <div>
              <button
                onClick={() => handlePhotoClick(photo)}
                className="text-blue-400 hover:underline"
              >
                {photo.filename || "Unnamed File"}
              </button>
            </div>
            <div>{photo.date ? new Date(photo.date).toLocaleString() : "Unknown Date"}</div>
            <div>{photo.size ? `${(photo.size / 1024 / 1024).toFixed(2)} MB` : "Unknown Size"}</div>
          </div>
        ))} */}

        {displayedPhotos.length > 0
          ? displayedPhotos.map((photo, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 p-2 border-b">
                <div>
                  <button
                    onClick={() => handlePhotoClick(photo)}
                    className="text-blue-400 hover:underline"
                  >
                    {photo.filename || "Unnamed File"}
                  
                  </button>
                </div>
                <div>
                  {photo.date
                    ? new Date(photo.date).toLocaleString()
                    : "Unknown Date"}
                </div>
                {/* <div>
                  {photo.size
                    ? `${(photo.size / 1024 / 1024).toFixed(2)} MB`
                    : "Unknown Size"}
                </div> */}
                <div>{photo.category || "Uncategorized"}</div>
              </div>
            ))
          : searchTerm && <p>No matching files found.</p>}
      </div>
    </div>
  );
};

export default ViewAllPhotos;
