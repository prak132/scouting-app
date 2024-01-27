import React from "react";
import BlueAuto from './assets/blue_auto.svg';
import './layout.css';

const AutoLayout = () => {
  const elapsedTime = 2.23;
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
            background: 'linear-gradient(#fff, #333)',
            background: '-webkit-linear-gradient(#fff, #333)',
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
      <img src={BlueAuto} alt="auto-img" className="auto-map"></img>
    </div>
    <div className="position-bounds">
        <div className="position-button blue-left">^</div>
        <div className="position-button blue-center">^</div>
        <div className="position-button blue-right">^</div>
    </div>
    </div>
      
  );
};

export default AutoLayout;