import React, { useState } from "react";
import AmpButton from "./ampButton.js";
import SpeakerButton from "./speakerButton.js";
import Teams from "./teamNumbers.js";
import Scored from "./scored.js";
import UndoInfo from "./undoinfo.js";


const TeleopLayout = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamSelect = (number) => {
    setSelectedTeam(number === selectedTeam ? null : number);
  };

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

  const scored = () => {
    if (selectedTeam && (ampSelected || speakerSelected)) {
      setTimeout(() => {
        setAmpSelected(false);
        setSpeakerSelected(false);
        setSelectedTeam(null);
      }, 500); 
      return `${ampSelected ? "Amp" : "Speaker"}`;
    }
    return null;
  };

  const elapsedTime = 2.23;

  return (
    

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
          }}
        >
          Teleop
        </div>
      </div>
      <div
        style={{
          color: "rgba(255, 255, 255, 0.50)",
          width: "100vw",
          fontSize: "4vw",
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
        <Teams onSelect={handleTeamSelect} selectedTeam={selectedTeam} />
        <UndoInfo />
        <Scored placed={scored()} teamnum={selectedTeam} />
        
      </div>
      <div>
        
        
      </div>
    </div>
    
  );
};//<hr style={{color: "#313B54", width: '100%', height: '100%', justifyContent: 'center', alignItems: 'right', gap: 291, display: 'inline-flex'}}></hr>

export default TeleopLayout;
