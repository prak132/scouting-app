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
            }}
        >
            <div
                style={{
                    width: 372,
                    height: 109,
                    background: isSelected ? "rgba(145.25, 145.25, 145.25, 0.20)" : "rgba(217, 217, 217, 0)",
                    boxShadow: "0px 0px 51px 5px rgba(255, 255, 255, 0.50)",
                    borderRadius: 10,
                    border: isSelected ? "1px white solid" : "1px #2F3953 solid",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                }}
            >
                <div
                    style={{
                        color: isSelected ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.50)",
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
