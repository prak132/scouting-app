import React from "react";

const AmpButton = ({ onSelect, isSelected }) => {
  const handleMouseDown = () => {
    onSelect();
  };

  return (
    <div
      type="ampButton"
      onMouseDown={handleMouseDown}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "2vh",
        marginTop: "2vh",
      }}
    >
      <div className={isSelected ? "selectedBTN" : "unselectedBTN"}>
        <div
          style={{
            // color: isSelected
            //   ? "rgba(255, 255, 255, 1)"
            //   : "rgba(255, 255, 255, 0.50)",
            fontSize: 26,
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          Amp
        </div>
      </div>
    </div>
  );
};

export default AmpButton;
