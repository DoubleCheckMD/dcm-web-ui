import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfileHeader from "../components/UserProfileHeader";
import useFetchUser from "../utils/useFetchUser";
import { secondOpinionService } from "../services";


// Simple back button with arrow
const BackButton = ({ to = "/dashboard" }) => {
  const navigate = useNavigate();
  
  const goBack = (e) => {
    e.preventDefault();
    navigate(to);
  };
  
  return (
    <button
      onClick={goBack}
      aria-label="Back to dashboard"
      className="inline-flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span className="font-medium">Back</span>
    </button>
  );
};

export default function SecondOpinionConsultantsPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);
  const [problemDetails, setProblemDetails] = useState("");
  const [previousHistory, setPreviousHistory] = useState("");
  const [comorbidities, setComorbidities] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const user = useFetchUser();


  const handleComorbiditiesChange = (e) => {
    setComorbidities(e.target.value);
  };

   const handleProblemDetailsChange = (e) => {
    setProblemDetails(e.target.value);
  };

  const handlePreviousHistoryChange = (e) => {
    setPreviousHistory(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
   setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {
      // Build payload
      const payload = {
        ...formData,
        problemDetails: problemDetails || "",
        comorbidities: comorbidities || "",
        previousHistory: previousHistory || "",
      };

      // Use the secondOpinionService
      const response = await secondOpinionService.createCase(payload, files);

      if (response.status === 200) {
        console.log("✅ Success:", response.data);
        setSubmitSuccess(true);
        
        // Reset form after short delay
        setTimeout(() => {
          handleReset();
          // Navigate to dashboard after successful submission
          navigate('/dashboard');
        }, 1500);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("❌ Error submitting case:", error);
      setSubmitError(error.message || "Failed to submit case. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({});
    setFiles([]);
    setComorbidities("");
    setProblemDetails("");
    setPreviousHistory("");
    setSubmitError("");
    setSubmitSuccess(false);
  };

  // const handleRemoveFile = (index) => {
  //   const newFiles = [...files];
  //   newFiles.splice(index, 1);
  //   setFiles(newFiles);
  // };

   const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <UserProfileHeader user={user} />

      <div className="max-w-5xl mx-auto px-4 py-8 transition-colors duration-200">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton to="/dashboard" />
        </div>

        {/* Main Form Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-200">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-accent to-accent-dark px-8 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">New Consultation</h1>
            <p className="text-blue-100">Get expert second opinion on your medical condition</p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
          {/* Success/Error Messages */}
          {submitSuccess && (
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 px-4 py-3 rounded flex items-center gap-3 shadow-sm">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-green-800 dark:text-green-200">Success! Redirecting to dashboard...</span>
            </div>
          )}

          {submitError && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 px-4 py-3 rounded flex items-center gap-3 shadow-sm">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-red-800 dark:text-red-200">{submitError}</span>
            </div>
          )}
          
          {/* Form Fields */}
          <div className="space-y-6">
            {/* Problem Details - Required */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Problem Details <span className="text-red-500">*</span>
              </label>
              <textarea
                name="problemDetails"
                value={problemDetails}
                onChange={handleProblemDetailsChange}
                required
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent dark:bg-gray-700 dark:text-white transition resize-none"
                placeholder="Describe your medical condition and symptoms..."
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Please provide detailed information about your current medical condition</p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Comorbidities */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Comorbidities <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  name="comorbidities"
                  value={comorbidities}
                  onChange={handleComorbiditiesChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent dark:bg-gray-700 dark:text-white transition resize-none"
                  placeholder="e.g., Diabetes, Hypertension"
                />
              </div>

              {/* Previous History */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Previous Medical History <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  name="previousHistory"
                  value={previousHistory}
                  onChange={handlePreviousHistoryChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent dark:bg-gray-700 dark:text-white transition resize-none"
                  placeholder="Past surgeries, treatments..."
                />
              </div>
            </div>
          </div>

         
          {/* File Upload Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Supporting Documents <span className="text-xs text-gray-500 font-normal">(Optional)</span>
            </label>
            <div
              className="p-10 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-center bg-gray-50 dark:bg-gray-700/30 hover:border-accent hover:bg-accent/5 transition-all cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Drag & drop files here</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">or</p>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="fileUpload"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer inline-block px-6 py-2 bg-accent text-white hover:bg-accent-dark rounded-lg transition font-medium"
              >
                Browse Files
              </label>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">Supported: PDF, JPG, PNG, DOC, DOCX</p>
            </div>
            
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{files.length} file{files.length > 1 ? 's' : ''} selected:</p>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{file.name}</span>
                      <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="ml-2 text-red-500 hover:text-red-700 p-1"
                      title="Remove"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              disabled={isSubmitting || submitSuccess}
              className="flex-1 bg-accent text-white px-8 py-3.5 rounded-lg hover:bg-accent-dark transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : submitSuccess ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Submitted!
                </>
              ) : (
                'Submit Consultation'
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="px-8 py-3.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
      </div>
    </div>
  );
}
