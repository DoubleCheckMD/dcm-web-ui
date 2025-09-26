import React, { useState } from 'react';
import BodySelector from '../components/BodySelector';

const HumanProblems = ({ onPartSelect }) => {
  const handlePartSelect = (part) => {
    onPartSelect(part); // Pass the selected part to the parent
  };

  return (
    <div className="flex flex-col items-center">
      <BodySelector onSelect={handlePartSelect} /> {/* Pass the handler */}
    </div>
  );
};

export default HumanProblems;