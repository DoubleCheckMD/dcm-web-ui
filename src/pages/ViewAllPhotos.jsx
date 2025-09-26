import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import debounce from "lodash/debounce"; // Install lodash: npm install lodash
import axios from "axios";

const ViewAllPhotos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]); // Initialize photos state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/upload", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Server response files:", response.data.files);
        setPhotos(response.data.files || []); // Update photos state
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const photosWithDefaultCategory = photos.map((photo) => ({
    ...photo,
    category: photo.category || "Uncategorized",
  }));

  const filterPhotos = useCallback(
    (term) => {
      if (term) {
        // const results = photos.filter((photo) =>
        const results = photosWithDefaultCategory.filter(
          (photo) =>
            photo.filename.toLowerCase().includes(term.toLowerCase()) ||
            (photo.category &&
              photo.category.toLowerCase().includes(term.toLowerCase()))
        );
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    },
    [photosWithDefaultCategory]
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

  const handleDelete = async (photoId) => {
    try {
      const token = localStorage.getItem("token");
      console.log("deleting id:", photoId);
      console.log("token:", token); //debugging
      const response = await axios.delete(
        `http://localhost:3000/upload/${photoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("server delete response:", response); //debugging
      console.log(response.data.message);
      console.log(response.data.id);

      if (response.status === 200) {
        const updatedPhotos = photos.filter((photo) => photo.id !== photoId);
        console.log("updated photos: ", updatedPhotos); //debugging
        setPhotos(updatedPhotos);
        console.log("photos after setPhotos:", photos); //debugging
        setSearchResults((prevResults) =>
          prevResults.filter((photo) => photo.id !== photoId)
        );
        console.log("searchResults after setSearchResults", searchResults); //debugging
        console.log("photo deleted successfully");
      } else {
        console.error("Delete failed with status:", response.status);
        alert("Delete operation failed.");
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
      console.error("error.response:", error.response); //debugging
      if (error.response) {
        console.error("Server Responded with:", error.response.data);
      }
      alert("An error occurred while deleting the photo.");
    }
  };

  const displayedPhotos = searchTerm ? searchResults : photos;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
      }}
    >
      <h1 className="text-xl font-bold mb-4">All Photos</h1>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search filenames or categories..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border p-2 rounded w-full"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              title="Clear"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x-circle"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="notebook-style">
        {/* Table Header */}
        <div className="grid grid-cols-[3fr_2fr_2fr_1fr] gap-4 p-2 bg-gray-100 rounded">
          <div>
            <strong>Filename</strong>
          </div>
          <div>
            <strong>Date</strong>
          </div>
          <div>
            <strong>Category</strong>
          </div>
          <div>
            <strong>Actions</strong>
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
              <div
                key={index}
                className="grid grid-cols-[3fr_2fr_2fr_1fr] gap-4 p-2 border-b items-center"
              >
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
                <div>
                  <button
                    onClick={() => {
                      console.log("photo object:", photo); //debuging
                      handleDelete(photo.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                    // add delete icon
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-trash-2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11l1 9" />
                      <path d="M14 11l-1 9" />
                      <path d="M5 6l1-2h12l1 2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          : searchTerm && <p>No matching files found.</p>}
      </div>
    </div>
  );
};

export default ViewAllPhotos;
