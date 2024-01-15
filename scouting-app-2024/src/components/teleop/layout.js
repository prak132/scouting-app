import React, { useState } from "react";
import AmpButton from "./ampButton.js";
import SpeakerButton from "./speakerButton.js";
import Teams from "./teamNumbers.js";
import Scored from "./scored.js";

const TeleopLayout = () => {
  const [ampSelected, setAmpSelected] = useState(false);
  const [speakerSelected, setSpeakerSelected] = useState(false);

  const handleAmpSelect = () => {
    setAmpSelected(!ampSelected);
    setSpeakerSelected(false);
  };

  const handleSpeakerSelect = () => {
    setSpeakerSelected(!speakerSelected);
    setAmpSelected(false);
  };

  const elapsedTime = 2.23;

  return (
    <div>
      <div
        type="teleop-text"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "10px",
        }}
      >
        <div
          type="teleop-text"
          className="title"
          style={{
            color: "white",
            fontSize: 48,
            fontWeight: "700",
            wordWrap: "break-word",
            paddingRight: "210px",
            letterSpacing: "3px",
            paddingTop: "178px",
          }}
        >
          Teleop
        </div>
      </div>
      <div
        style={{
          color: "rgba(255, 255, 255, 0.50)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "180px",
          fontSize: 20,
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        Scoring • Timer: {elapsedTime}s
      </div>

      <div>
        <AmpButton onSelect={handleAmpSelect} isSelected={ampSelected} />
        <SpeakerButton
          onSelect={handleSpeakerSelect}
          isSelected={speakerSelected}
        />
        <Teams />
        <Scored />
      </div>
    </div>
  );
};

export default TeleopLayout;
