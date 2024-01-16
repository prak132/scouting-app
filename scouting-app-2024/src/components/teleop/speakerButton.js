import React from "react";

const SpeakerButton = ({ onSelect, isSelected }) => {
  const handleMouseDown = () => {
    onSelect();
  };

  return (
    <div
      type="speakerButton"
      onMouseDown={handleMouseDown}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "10vh",
        margin: 0,
        cursor: "pointer",
      }}
    >
      <div className={isSelected ? "selectedBTN" : "unselectedBTN"}>
        <div
          style={{
            fontSize: 26,
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          Speaker
        </div>
      </div>
    </div>
  );
};

export default SpeakerButton;
