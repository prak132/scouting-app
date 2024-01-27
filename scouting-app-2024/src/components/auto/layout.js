import React, { useState } from "react";
import BlueAuto from './assets/blue_auto.svg';
import './layout.css';

const AutoLayout = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const elapsedTime = 2.23;
  const pos = ["Left", "Middle", "Right"]; 
  const handlePositionClick = (position) => {
    setSelectedPosition(position);
  };
  return (
    <div>
      <div
        style={{
          paddingTop: "15vh",
        }}
      >
        <div type="teleop-text">
          <div
            type="teleop-text"
            className="title"
            style={{
              color: "white",
              fontSize: "10vw",
              fontWeight: "700",
              wordWrap: "break-word",
              marginBottom: "-0.25vh",
              background: 'linear-gradient(#fff, #333), -webkit-linear-gradient(#fff, #333)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Auto
          </div>
        </div>
        <div
          style={{
            color: "rgba(255, 255, 255, 0.50)",
            width: "70vw",
            fontSize: "4vw",
          }}
        >
          Scoring • Timer: {elapsedTime}s
        </div>
      </div>
      <div className="svg-bounding">
        <img src={BlueAuto} alt="auto-img" className="auto-map" />
        <button className="note-button"></button>
      </div>
      <div className="position-bounds">
        {pos.map((position, index) => (
          <div
            key={index}
            className={`position-button blue-${position.toLowerCase()} ${selectedPosition === position ? "selected" : ""}`}
            onClick={() => handlePositionClick(position)}
          >
            {position}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoLayout;