import React, { useState } from "react";

const AmpButton = ({ onSelect }) => {
    const [isSelected, setIsSelected] = useState(false);
    const handleMouseDown = () => {
        setIsSelected(true);
    };
    const handleMouseUp = () => {
        if (isSelected) {
            onSelect();
        }
        setIsSelected(false);
    };
    return (
        <div
            type="ampButton"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "25vh",
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
                    Amp
                </div>
            </div>
        </div>
    );
};

export default AmpButton;
