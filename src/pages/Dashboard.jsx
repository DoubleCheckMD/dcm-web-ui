import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";
import EditProfileModal from "../components/EditProfileModal";
import ThemeToggle from "../components/ThemeToggle";
import useFetchUser from "../utils/useFetchUser";
import { secondOpinionService, uploadService, authService } from "../services";

const Dashboard = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTelly, setSelectedTelly] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useFetchUser();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Use the services instead of direct axios calls
        const [tellyRes, uploadRes] = await Promise.all([
          secondOpinionService.getAllCases(),
          uploadService.getDocuments().catch(() => ({ data: [] })),
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
  }, [location.key]); // Re-fetch when navigation occurs

  const getStatus = (item) => item?.status || "Unknown";

  const formatDate = (value) => {
    if (!value) return "N/A";
    const d = new Date(value);
    return isNaN(d) ? value : d.toLocaleString();
  };

  const handleViewReport = (tellyItem) => {
    // Navigate to case details page instead
    navigate(`/case-details/${tellyItem.id}`, { state: { caseData: tellyItem } });
  };

  const openUpload = (upload) => {
    // Prepare all files from the case for navigation
    const allFiles = selectedTelly.uploads.map(u => ({
      filename: u.filename || u.fileName || `report-${u.id || ""}`,
      data: u.fileData || u.data || u.base64 || "",
      type: u.fileType || "application/octet-stream",
      size: u.size || 0,
    }));

    // Find the index of the clicked file
    const currentIndex = selectedTelly.uploads.findIndex(u => u.id === upload.id);

    setReportModalOpen(false);
    setSelectedTelly(null);
    navigate("/file-details", { 
      state: { 
        file: allFiles[currentIndex >= 0 ? currentIndex : 0], 
        allFiles,
        currentIndex: currentIndex >= 0 ? currentIndex : 0
      } 
    });
  };

  const handleCreateCase = () => {
    navigate("/create-case");
  };

  const handleEditProfile = () => {
    setEditProfileModalOpen(true);
  };

  const handleSaveProfile = async (updatedData) => {
    try {
      // TODO: Call API to save profile
      // For now, just update localStorage mock user
      const currentUser = JSON.parse(localStorage.getItem('mockUser') || '{}');
      const updatedUser = { ...currentUser, ...updatedData };
      localStorage.setItem('mockUser', JSON.stringify(updatedUser));
      
      // Refresh page to update user data
      window.location.reload();
    } catch (error) {
      throw error;
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center fade-in">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left spacer for balance */}
            <div className="flex items-center gap-4 w-[200px]">
              {/* Empty space for symmetry */}
            </div>

            {/* Center: Logo and Brand Name */}
            <div className="flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-accent to-accent-dark rounded-xl shadow-lg">
                <img 
                  src="/Second Opinion Logo.png" 
                  alt="Second Opinion" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">
                    <span className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">Second</span>
                    <span className="text-gray-800 dark:text-white"> Opinion</span>
                  </h1>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Medical Consultation Platform</p>
              </div>
            </div>
            
            {/* Right: Theme Toggle and Profile */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {user && <ProfileDropdown user={user} onEditProfile={handleEditProfile} />}
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-col flex-1 px-6 py-8">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Consultations</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {photos.length} {photos.length === 1 ? 'consultation' : 'consultations'} total
              </p>
            </div>
            <button
              onClick={handleCreateCase}
              className="bg-accent hover:bg-accent-dark text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Consultation
            </button>
          </div>

          {/* Quick Stats */}
          {photos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm scale-in hover:shadow-md transition-shadow duration-300" style={{ animationDelay: '0ms' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {photos.filter(p => p.status === "Pending").length}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm scale-in hover:shadow-md transition-shadow duration-300" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {photos.filter(p => p.status === "In Progress").length}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm scale-in hover:shadow-md transition-shadow duration-300" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {photos.filter(p => p.status === "Completed").length}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card Grid */}
        {photos && photos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((p, idx) => (
              <div
                key={p.id || idx}
                onClick={() => handleViewReport(p)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden group hover:scale-[1.02] hover:-translate-y-1 scale-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* Card Header */}
                <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        p.status === "Completed"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                          : p.status === "Pending"
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200"
                          : p.status === "In Progress"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        p.status === "Completed" ? "bg-green-500" :
                        p.status === "Pending" ? "bg-yellow-500" :
                        p.status === "In Progress" ? "bg-blue-500" : "bg-gray-500"
                      }`}></span>
                      {p.status || "Unknown"}
                    </span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-accent transition-colors">
                    {String(p.problemDetails || `Case ${idx + 1}`).slice(0, 80)}
                    {String(p.problemDetails).length > 80 && "..."}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  {p.comorbidities && (
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Comorbidities</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                          {String(p.comorbidities).slice(0, 50)}
                          {String(p.comorbidities).length > 50 && "..."}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(p.createDate).toLocaleDateString()}</span>
                    </div>
                    {p.updatedDate && p.updatedDate !== p.createDate && (
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Updated {new Date(p.updatedDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
            <svg className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">No consultations yet</p>
            <p className="text-gray-400 dark:text-gray-500 mb-6">Get started by creating your first consultation</p>
            <button
              onClick={handleCreateCase}
              className="bg-accent hover:bg-accent-dark text-white font-medium px-6 py-3 rounded-lg shadow-lg transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create First Consultation
            </button>
          </div>
        )}

        {/* Report Modal */}
        {reportModalOpen && selectedTelly && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-11/12 max-w-2xl p-6 relative animate-fadeIn">
              <button
                onClick={() => {
                  setReportModalOpen(false);
                  setSelectedTelly(null);
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                ✕
              </button>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                Reports for this Consultation
              </h3>
              <div className="space-y-3 max-h-72 overflow-auto">
                {Array.isArray(selectedTelly.uploads) &&
                selectedTelly.uploads.length > 0 ? (
                  selectedTelly.uploads.map((u, i) => (
                    <div
                      key={u.id || i}
                      className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">
                          {u.filename || `Report ${i + 1}`}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {u.category || u.fileType || ""}
                        </div>
                      </div>
                      <button
                        onClick={() => openUpload(u)}
                        className="text-accent hover:text-accent-dark dark:hover:text-accent-light hover:underline text-sm font-medium transition-colors"
                      >
                        Open
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-600 dark:text-gray-400 text-center py-4">
                    No reports attached.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit Profile Modal */}
      {editProfileModalOpen && (
        <EditProfileModal
          isOpen={editProfileModalOpen}
          onClose={() => setEditProfileModalOpen(false)}
          user={user}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};

export default Dashboard;
