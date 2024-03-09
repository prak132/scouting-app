import React, { useState, useEffect } from "react";
import AmpButton from "./ampButton.js";
import SpeakerButton from "./speakerButton.js";
import Teams from "./teamNumbers.js";
import Notif from "./toast.js";

const TeleopLayout = ( {time, quantTelescoredTeams, quantTeleSetScoredTeams, blueTeamNumbers, redTeamNumbers, selAlliance} ) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [ampSelected, setAmpSelected] = useState(false);
  const [speakerSelected, setSpeakerSelected] = useState(false);
  const handleTeamSelect = (number) => {
    setSelectedTeam(number === selectedTeam ? null : number);
  };

  const handleAmpSelect = () => {
    setAmpSelected(!ampSelected);
    setSpeakerSelected(false);
  };

  const handleSpeakerSelect = () => {
    setSpeakerSelected(!speakerSelected);
    setAmpSelected(false);
  };


  const [storedTeam, setStoredTeam] = useState('');
  const [storedElement, setStoredElement] = useState('');

  useEffect(() => {
    const scored = () => {
      if (selectedTeam && (ampSelected || speakerSelected)) {
        const scoringElement = `${ampSelected ? "Amp" : "Speaker"}`;
        setStoredTeam(selectedTeam);
        setStoredElement(scoringElement);
        quantTeleSetScoredTeams(prevTeams => {
          const newTeams = [...prevTeams, [selectedTeam, scoringElement, time.toFixed(2)]];
          return newTeams;
        });
        const resetValues = () => {
          setAmpSelected(false);
          setSpeakerSelected(false);
          setSelectedTeam(null);
        };
        setTimeout(resetValues, 30);
      }
    };
    if (ampSelected || speakerSelected) {
      scored();
    }
    console.log(quantTelescoredTeams);
    // eslint-disable-next-line
  }, [selectedTeam, ampSelected, speakerSelected]);  

  function callNotif() {
    if (selectedTeam && (ampSelected || speakerSelected)) {
      return true;
    };
    return null;
  };

  return (
    <div
      style={{
        paddingTop: "25vh",
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
            background: '-webkit-linear-gradient(#eee, #333)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Teleop
        </div>
      </div>
      <div
        style={{
          color: "rgba(255, 255, 255, 0.50)",
          width: "70vw",
          fontSize: "15px",
        }}
      >
        Scoring • {selAlliance === '0' ? "Blue" : "Red"} • Timer: {time.toFixed(2)}s
      </div>

      <div>
        <AmpButton onSelect={handleAmpSelect} isSelected={ampSelected} />
        <SpeakerButton
          onSelect={handleSpeakerSelect}
          isSelected={speakerSelected}
        />
        <Teams onSelect={handleTeamSelect} selectedTeam={selectedTeam} blueTeamNumbers={blueTeamNumbers} redTeamNumbers={redTeamNumbers} selAlliance={selAlliance} />
        <Notif contents={storedTeam + ' scored ' + storedElement} launchNotif={callNotif()} />
        
      </div>
      <div>
        
        
      </div>
    </div>
    
  );
};//<hr style={{color: "#313B54", width: '100%', height: '100%', justifyContent: 'center', alignItems: 'right', gap: 291, display: 'inline-flex'}}></hr>

export default TeleopLayout;
