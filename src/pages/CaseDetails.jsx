import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import UserProfileHeader from '../components/UserProfileHeader';
import useFetchUser from '../utils/useFetchUser';
import { secondOpinionService } from '../services';

const CaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useFetchUser();
  
  const [caseData, setCaseData] = useState(location.state?.caseData || null);
  const [loading, setLoading] = useState(!caseData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!caseData && id) {
      // Fetch case data if not passed via navigation state
      const fetchCaseData = async () => {
        try {
          setLoading(true);
          const data = await secondOpinionService.getCaseById(id);
          setCaseData(data);
        } catch (err) {
          console.error('Error fetching case details:', err);
          setError('Failed to load case details');
        } finally {
          setLoading(false);
        }
      };
      fetchCaseData();
    }
  }, [id, caseData]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const handleBackToHome = () => {
    navigate('/dashboard');
  };

  const openFile = (upload) => {
    const file = {
      filename: upload.filename || upload.fileName || `file-${upload.id || ""}`,
      data: upload.fileData || upload.data || upload.base64 || "",
      category: upload.category || upload.fileType || "",
    };

    // Open in new tab/window
    if (file.data) {
      const byteString = atob(file.data.split(",")[1] || file.data);
      const mimeString = file.data.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } else {
      navigate("/file-details", { state: { file } });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <UserProfileHeader user={user} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading case details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <UserProfileHeader user={user} />
        <div className="max-w-4xl mx-auto p-6 mt-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl">
            <p>{error || 'Case not found'}</p>
          </div>
          <button
            onClick={handleBackToHome}
            className="mt-4 inline-flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <UserProfileHeader user={user} />
      
      <main className="max-w-6xl mx-auto p-6 mt-6">
        {/* Header with Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              caseData.status === "Completed"
                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                : caseData.status === "Pending"
                ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}>
              {caseData.status || "Unknown"}
            </span>
          </div>
        </div>

        {/* Case Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 transition-colors duration-200">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            Case Details
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case ID */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Case ID
              </label>
              <p className="text-gray-900 dark:text-gray-100 font-mono bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
                {caseData.id || 'N/A'}
              </p>
            </div>

            {/* Created Date */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Created Date
              </label>
              <p className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
                {formatDate(caseData.createDate)}
              </p>
            </div>

            {/* Updated Date */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Last Updated
              </label>
              <p className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
                {formatDate(caseData.updatedDate)}
              </p>
            </div>

            {/* User Email */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                User
              </label>
              <p className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
                {caseData.userEmail || user?.email || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Medical Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 transition-colors duration-200">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            Medical Information
          </h2>

          <div className="space-y-6">
            {/* Problem Details */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Problem Details
              </label>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                  {caseData.problemDetails || 'No information provided'}
                </p>
              </div>
            </div>

            {/* Comorbidities */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Comorbidities
              </label>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                  {caseData.comorbidities || 'No comorbidities reported'}
                </p>
              </div>
            </div>

            {/* Previous History */}
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Previous Medical History
              </label>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                  {caseData.previousHistory || 'No previous history reported'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Uploaded Files Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            Uploaded Files & Reports
          </h2>

          {caseData.uploads && caseData.uploads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {caseData.uploads.map((upload, index) => (
                <div
                  key={upload.id || index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
                  onClick={() => openFile(upload)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {/* File Icon */}
                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                          {upload.filename || upload.fileName || `File ${index + 1}`}
                        </h3>
                      </div>
                      {(upload.category || upload.fileType) && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 ml-7">
                          {upload.category || upload.fileType}
                        </p>
                      )}
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">No files uploaded for this case</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CaseDetails;
