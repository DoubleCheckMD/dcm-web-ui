import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileDropdown from "../components/ProfileDropdown";
import useFetchUser from "../utils/useFetchUser";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTelly, setSelectedTelly] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const navigate = useNavigate();
  const user = useFetchUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [tellyRes, uploadRes] = await Promise.all([
          axios.get("http://localhost:3000/tellyConsultant", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios
            .get("http://localhost:3000/upload", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .catch(() => ({ data: [] })),
        ]);

        const telly = Array.isArray(tellyRes.data)
          ? tellyRes.data
          : tellyRes.data?.items || [];
        const normalized = telly.map((t) => {
          const firstUpload =
            Array.isArray(t.uploads) && t.uploads.length > 0
              ? t.uploads[0]
              : null;
          return { ...t, _firstUpload: firstUpload };
        });

        setPhotos(normalized);
      } catch (err) {
        console.error("fetch telly-consultant error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatus = (item) => item?.status || "Unknown";

  const formatDate = (value) => {
    if (!value) return "N/A";
    const d = new Date(value);
    return isNaN(d) ? value : d.toLocaleString();
  };

  const handleViewReport = (tellyItem) => {
    if (Array.isArray(tellyItem.uploads) && tellyItem.uploads.length === 1) {
      openUpload(tellyItem.uploads[0]);
      return;
    }
    setSelectedTelly(tellyItem);
    setReportModalOpen(true);
  };

  const openUpload = (upload) => {
    const file = {
      filename: upload.filename || upload.fileName || `report-${upload.id || ""}`,
      data: upload.fileData || upload.data || upload.base64 || "",
      type: upload.fileType || "application/octet-stream",
    };
    setReportModalOpen(false);
    setSelectedTelly(null);
    navigate("/file-details", { state: { file } });
  };

  const handleCreateCase = () => {
    navigate("/create-case");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md">
        <h1 className="text-2xl font-semibold tracking-wide">Dashboard</h1>
        {user && <ProfileDropdown user={user} />}
      </header>

      {/* Main */}
      <main className="flex flex-col flex-1 px-6 py-8">
        {/* Consulting Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleCreateCase}
            className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-medium px-6 py-2 rounded-xl shadow-md transition-all duration-200"
          >
            + New Consultation
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">Problem Details</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Created</th>
                <th className="px-6 py-3 text-left">Updated</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {photos && photos.length > 0 ? (
                photos.map((p, idx) => (
                  <tr
                    key={p.id || idx}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-3 text-gray-800">
                      {String(p.problemDetails || `Record ${idx + 1}`).slice(
                        0,
                        100
                      )}
                      {String(p.problemDetails).length > 100 && "..."}
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          p.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : p.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {p.status || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                      {formatDate(p.createDate)}
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                      {formatDate(p.updatedDate)}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button
                        onClick={() => handleViewReport(p)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-6 text-center text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Report Modal */}
        {reportModalOpen && selectedTelly && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-xl w-11/12 max-w-2xl p-6 relative animate-fadeIn">
              <button
                onClick={() => {
                  setReportModalOpen(false);
                  setSelectedTelly(null);
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Reports for this Consultation
              </h3>
              <div className="space-y-3 max-h-72 overflow-auto">
                {Array.isArray(selectedTelly.uploads) &&
                selectedTelly.uploads.length > 0 ? (
                  selectedTelly.uploads.map((u, i) => (
                    <div
                      key={u.id || i}
                      className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div>
                        <div className="font-medium text-gray-800">
                          {u.filename || `Report ${i + 1}`}
                        </div>
                        <div className="text-sm text-gray-500">
                          {u.category || u.fileType || ""}
                        </div>
                      </div>
                      <button
                        onClick={() => openUpload(u)}
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        Open
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-600 text-center py-4">
                    No reports attached.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
