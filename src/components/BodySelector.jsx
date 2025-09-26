import React, { useState } from "react";

const BodySelector = ({ onSelect }) => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [isFrontSide, setIsFrontSide] = useState(true); // State to toggle between front and back

  const handlePartClick = (event) => {
    const part = event.target.getAttribute("data-part");
    setSelectedPart(part);
    if (onSelect) {
      onSelect(part); // Notify the parent about the selected part
    }
  };

  const toggleView = () => {
    setIsFrontSide(!isFrontSide);
  };
  
  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "30px", color: "#333", fontSize: "2em" }}>
        Select a Body Part
      </h2>

      <button
        onClick={toggleView}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {isFrontSide ? "View Back Side" : "View Front Side"}
      </button>

      <svg
        viewBox="0 0 600 1200"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          border: "2px solid #ccc",
          borderRadius: "15px",
          background: "linear-gradient(to bottom, #f0f8ff, #e0e0e0)",
          width: "80%",
          height: "auto",
          maxWidth: "600px",
          margin: "0 auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
        }}
      >
        <style>
          {`
            .clickable {
              fill: #e6e6fa;
              stroke: #555;
              stroke-width: 3;
              cursor: pointer;
              transition: fill 0.3s ease, transform 0.3s ease;
            }
            .clickable:hover {
              fill: #c1c1d1;
              transform: scale(1.08);
            }
          `}
        </style>

        {isFrontSide ? (
          <>
            {/* Front Side */}
            {/* Head */}
            <ellipse
              id="head"
              className="clickable"
              cx="300"
              cy="120"
              rx="80"
              ry="60"
              data-part="Head"
              onClick={handlePartClick}
            />
            {/* Forehead */}
            <rect
              id="forehead"
              className="clickable"
              x="260"
              y="60"
              width="80"
              height="30"
              data-part="Forehead"
              onClick={handlePartClick}
            />
            {/* Left Eye */}
            <circle
              id="left-eye"
              className="clickable"
              cx="270"
              cy="100"
              r="10"
              data-part="Left Eye"
              onClick={handlePartClick}
            />
            {/* Right Eye */}
            <circle
              id="right-eye"
              className="clickable"
              cx="330"
              cy="100"
              r="10"
              data-part="Right Eye"
              onClick={handlePartClick}
            />
            {/* Nose */}
            <polygon
              id="nose"
              className="clickable"
              points="300,120 290,140 310,140"
              data-part="Nose"
              onClick={handlePartClick}
            />
            {/* Mouth */}
            <path
              id="mouth"
              className="clickable"
              d="M 280 155 C 290 165, 310 165, 320 155"
              stroke="#555"
              strokeWidth="3"
              fill="none"
              data-part="Mouth"
              onClick={handlePartClick}
            />
            {/* Left Ear */}
            <ellipse
              id="left-ear"
              className="clickable"
              cx="220"
              cy="110"
              rx="15"
              ry="25"
              data-part="Left Ear"
              onClick={handlePartClick}
            />
            {/* Right Ear */}
            <ellipse
              id="right-ear"
              className="clickable"
              cx="380"
              cy="110"
              rx="15"
              ry="25"
              data-part="Right Ear"
              onClick={handlePartClick}
            />
            {/* Hair */}
            <path
              id="hair"
              className="clickable"
              d="M 220 60 C 250 20, 350 20, 380 60 Q 300 0, 220 60"
              fill="#8B4513"
              data-part="Hair"
              onClick={handlePartClick}
            />
            {/* Neck */}
            <rect
              id="neck"
              className="clickable"
              x="280"
              y="180"
              width="40"
              height="50"
              data-part="Neck"
              onClick={handlePartClick}
            />
            {/* Torso */}
            <rect
              id="torso"
              className="clickable"
              x="225"
              y="230"
              width="150"
              height="300"
              data-part="Torso"
              onClick={handlePartClick}
            />
            {/* Stomach */}
            <rect
              id="stomach"
              className="clickable"
              x="240"
              y="380"
              width="120"
              height="80"
              data-part="Stomach"
              onClick={handlePartClick}
            />
            {/* Heart */}
            <circle
              id="heart"
              className="clickable"
              cx="300"
              cy="320"
              r="30"
              data-part="Heart"
              onClick={handlePartClick}
            />
            {/* Left Arm */}
            <rect
              id="left-arm"
              className="clickable"
              x="140"
              y="230"
              width="60"
              height="220"
              data-part="Left Arm"
              onClick={handlePartClick}
            />
            {/* Right Arm */}
            <rect
              id="right-arm"
              className="clickable"
              x="400"
              y="230"
              width="60"
              height="220"
              data-part="Right Arm"
              onClick={handlePartClick}
            />
            {/* Left Elbow */}
            <circle
              id="left-elbow"
              className="clickable"
              cx="170"
              cy="350"
              r="15"
              data-part="Left Elbow"
              onClick={handlePartClick}
            />
            {/* Right Elbow */}
            <circle
              id="right-elbow"
              className="clickable"
              cx="430"
              cy="350"
              r="15"
              data-part="Right Elbow"
              onClick={handlePartClick}
            />
            {/* Left Hand */}
            <ellipse
              id="left-hand"
              className="clickable"
              cx="170"
              cy="460"
              rx="30"
              ry="25"
              data-part="Left Hand"
              onClick={handlePartClick}
            />
            {/* Right Hand */}
            <ellipse
              id="right-hand"
              className="clickable"
              cx="430"
              cy="460"
              rx="30"
              ry="25"
              data-part="Right Hand"
              onClick={handlePartClick}
            />
            {/* Fingers */}
            <rect
              id="left-fingers"
              className="clickable"
              x="160"
              y="485"
              width="30"
              height="40"
              data-part="Left Fingers"
              onClick={handlePartClick}
            />
            <rect
              id="right-fingers"
              className="clickable"
              x="420"
              y="485"
              width="30"
              height="40"
              data-part="Right Fingers"
              onClick={handlePartClick}
            />
            {/* Left Leg */}
            <rect
              id="left-leg"
              className="clickable"
              x="240"
              y="530"
              width="50"
              height="300"
              data-part="Left Leg"
              onClick={handlePartClick}
            />
            {/* Right Leg */}
            <rect
              id="right-leg"
              className="clickable"
              x="310"
              y="530"
              width="50"
              height="300"
              data-part="Right Leg"
              onClick={handlePartClick}
            />
            {/* Right Knee */}
            <ellipse
              id="right-knee"
              className="clickable"
              cx="335"
              cy="700"
              rx="25"
              ry="20"
              data-part="Right Knee"
              onClick={handlePartClick}
            />
            {/* Left Knee */}
            <ellipse
              id="left-knee"
              className="clickable"
              cx="265"
              cy="700"
              rx="25"
              ry="20"
              data-part="Left Knee"
              onClick={handlePartClick}
            />
            {/* Left Foot */}
            <ellipse
              id="left-foot"
              className="clickable"
              cx="265"
              cy="860"
              rx="35"
              ry="20"
              data-part="Left Foot"
              onClick={handlePartClick}
            />
            {/* Right Foot */}
            <ellipse
              id="right-foot"
              className="clickable"
              cx="335"
              cy="860"
              rx="35"
              ry="20"
              data-part="Right Foot"
              onClick={handlePartClick}
            />
            {/* Left toe */}
            <ellipse
              id="left-toe"
              className="clickable"
              cx="265"
              cy="880"
              rx="15"
              ry="10"
              data-part="Left Toe"
              onClick={handlePartClick}
            />
            {/* Right toe */}
            <ellipse  
              id="right-toe"
              className="clickable"
              cx="335"
              cy="880"
              rx="15"
              ry="10"
              data-part="Right Toe"
              onClick={handlePartClick}
            />
            {/* Left Kidney */}
            <ellipse
              id="left-kidney"
              className="clickable"
              cx="260"
              cy="400"
              rx="20"
              ry="30"
              data-part="Left Kidney"
              onClick={handlePartClick}
            />
            {/* Right Kidney */}
            <ellipse
              id="right-kidney"
              className="clickable"
              cx="340"
              cy="400"
              rx="20"
              ry="30"
              data-part="Right Kidney"
              onClick={handlePartClick}
            />
          </>
        ) : (
          <>
            {/* Back Side */}
              {/* Head */}
              <ellipse
              id="head"
              className="clickable"
              cx="300"
              cy="120"
              rx="80"
              ry="60"
              data-part="Head"
              onClick={handlePartClick}
            />
             {/* Neck */}
             <rect
              id="back-neck"
              className="clickable"
              x="280"
              y="180"
              width="40"
              height="50"
              data-part="Back Neck"
              onClick={handlePartClick}
            />

            {/* Back Torso */}
            <rect
              id="back-torso"
              className="clickable"
              x="225"
              y="230"
              width="150" 
              height="300"
              data-part="Back Torso"
              onClick={handlePartClick}
            />
            {/* Hair */}
            <path
              id="back-hair"
              className="clickable"
              d="M 220 60 C 250 20, 350 20, 380 60 Q 300 0, 220 60"
              fill="#8B4513"
              data-part="Back Hair"
              onClick={handlePartClick}
            />
            {/* Spine */}
            <rect
              id="spine"
              className="clickable"
              x="290"
              y="230"
              width="30"
              height="300"
              data-part="Spine"
              onClick={handlePartClick}
            />
            {/* Left Shoulder */}
            <ellipse
              id="left-shoulder"
              className="clickable"
              cx="210"
              cy="250"
              rx="30"
              ry="20"
              data-part="Left Shoulder"
              onClick={handlePartClick}
            />
            {/* Right Shoulder */}
            <ellipse
              id="right-shoulder"
              className="clickable"
              cx="390"
              cy="250"
              rx="30"
              ry="20"
              data-part="Right Shoulder"
              onClick={handlePartClick}
            />
            {/* Left Arm */}
            <rect
              id="back-left-arm"
              className="clickable"
              x="140"
              y="270"
              width="60"
              height="200"
              data-part="Back Left Arm"
              onClick={handlePartClick}
            />
            {/* Right Arm */}
            <rect
              id="back-right-arm"
              className="clickable"
              x="400"
              y="270"
              width="60"
              height="200"
              data-part="Back Right Arm"
              onClick={handlePartClick}
            />
            {/* Left Buttock */}
            <ellipse
              id="left-buttock"
              className="clickable"
              cx="240"
              cy="550"
              rx="40"
              ry="50"
              data-part="Left Buttock"
              onClick={handlePartClick}
            />
            {/* Right Buttock */}
            <ellipse
              id="right-buttock"
              className="clickable"
              cx="360"
              cy="550"
              rx="40"
              ry="50"
              data-part="Right Buttock"
              onClick={handlePartClick}
            />
              {/* Left Thigh */}
              <rect
              id="back-left-thigh"
              className="clickable"
              x="240"
              y="580"
              width="50"
              height="150"
              data-part="Back Left Thigh"
              onClick={handlePartClick}
            />
            {/* Right Thigh */}
            <rect
              id="back-right-thigh"
              className="clickable"
              x="310"
              y="580"
              width="50"
              height="150"
              data-part="Back Right Thigh"
              onClick={handlePartClick}
            />
            {/* Left Leg */}
            <rect
              id="back-left-leg"
              className="clickable"
              x="240"
              y="600"
              width="50"
              height="300"
              data-part="Back Left Leg"
              onClick={handlePartClick}
            />
            {/* Right Leg */}
            <rect
              id="back-right-leg"
              className="clickable"
              x="310"
              y="600"
              width="50"
              height="300"
              data-part="Back Right Leg"
              onClick={handlePartClick}
            />
            {/* Left Knee */}
            <ellipse
              id="back-left-knee"
              className="clickable"
              cx="265"
              cy="750"
              rx="25"
              ry="20"
              data-part="Back Left Knee"
              onClick={handlePartClick}
            />
            {/* Right Knee */}
            <ellipse
              id="back-right-knee"
              className="clickable"
              cx="335"
              cy="750"
              rx="25"
              ry="20"
              data-part="Back Right Knee"
              onClick={handlePartClick}
            />
            {/* Left Calf */}
            <rect
              id="back-left-calf"
              className="clickable"
              x="240"
              y="780"
              width="50"
              height="100"
              data-part="Back Left Calf"
              onClick={handlePartClick}
            />
            {/* Right Calf */}
            <rect
              id="back-right-calf"
              className="clickable"
              x="310"
              y="780"
              width="50"
              height="100"
              data-part="Back Right Calf"
              onClick={handlePartClick}
            />
           {/* Left Heel */}
           <ellipse
              id="back-left-heel"
              className="clickable"
              cx="245"
              cy="900"
              rx="15"
              ry="20"
              data-part="Back Left Heel"
              onClick={handlePartClick}
            />
             {/* Right Heel */}
             <ellipse
              id="back-right-heel"
              className="clickable"
              cx="355"
              cy="900"
              rx="15"
              ry="20"
              data-part="Back Right Heel"
              onClick={handlePartClick}
            />
             {/* Left Ankle */}
             <ellipse
              id="back-left-ankle"
              className="clickable"
              cx="265"
              cy="880"
              rx="15"
              ry="10"
              data-part="Back Left Ankle"
              onClick={handlePartClick}
            />
             {/* Right Ankle */}
             <ellipse
              id="back-right-ankle"
              className="clickable"
              cx="335"
              cy="880"
              rx="15"
              ry="10"
              data-part="Back Right Ankle"
              onClick={handlePartClick}
            />
            {/* Left Kidney */}
            <ellipse
              id="left-kidney"
              className="clickable"
              cx="260"
              cy="400"
              rx="20"
              ry="30"
              data-part="Left Kidney"
              onClick={handlePartClick}
            />
            {/* Right Kidney */}
            <ellipse
              id="right-kidney"
              className="clickable"
              cx="340"
              cy="400"
              rx="20"
              ry="30"
              data-part="Right Kidney"
              onClick={handlePartClick}
            />
          </>
        )}
      </svg>

      {selectedPart && (
        <p
          style={{
            marginTop: "30px",
            fontSize: "20px",
            color: "#555",
            fontWeight: "bold",
          }}
        >
          Selected Part:{" "}
          <span style={{ color: "#007BFF" }}>{selectedPart}</span>
        </p>
      )}
    </div>
  );
};

export default BodySelector;
