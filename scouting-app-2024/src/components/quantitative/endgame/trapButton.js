import React from "react";

const TrapButton = ({ onSelect, isSelected }) => {
  const handleMouseDown = () => {
    onSelect();
  };

  return (
    <div
      type="trapButton"
      onMouseDown={handleMouseDown}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "4vh",
        height: '100px',
        cursor: "pointer",
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
          Trap
        </div>
      </div>
    </div>
  );
};

export default TrapButton;
