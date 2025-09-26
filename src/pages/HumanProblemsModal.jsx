import React, { useState } from 'react';
import HumanProblems from './HumanProblems';

const HumanProblemsModal = ({ onClose, onSave }) => {
  const [selectedBodyParts, setSelectedBodyParts] = useState([]);
  const [problemDetails, setProblemDetails] = useState('');

  const handleBodyPartSelect = (part) => {
    if (!selectedBodyParts.includes(part)) {
      setSelectedBodyParts([...selectedBodyParts, part]);
    }
  };

  const handleRemovePart = (partToRemove) => {
    setSelectedBodyParts(selectedBodyParts.filter((part) => part !== partToRemove));
  };

  const handleProblemDetailsChange = (event) => {
    setProblemDetails(event.target.value);
  };

  const handleSave = () => {
    console.log('Selected Body Parts:', selectedBodyParts);
    console.log('Problem Details:', problemDetails);
    onSave({ selectedBodyParts, problemDetails });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Human Body Problems</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              aria-label="Close"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4">
            <HumanProblems onPartSelect={handleBodyPartSelect} />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h3 className="font-semibold mb-2">Selected Body Parts:</h3>
            <ul className="mb-4">
              {selectedBodyParts.map((part, index) => (
                <li key={index} className="flex items-center justify-between">
                  {part}
                  <button
                    onClick={() => handleRemovePart(part)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold mb-2">Problem Details:</h3>
            <textarea
              className="w-full p-2 border rounded"
              value={problemDetails}
              onChange={handleProblemDetailsChange}
              placeholder="Enter details about the problem..."
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default HumanProblemsModal;