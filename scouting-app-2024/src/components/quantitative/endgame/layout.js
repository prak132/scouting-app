import React, { useState, useEffect } from "react";
import AmpButton from "./ampButton.js";
import SpeakerButton from "./speakerButton.js";
import Teams from "./teamNumbers.js";
import Notif from "./toast.js";
import TrapButton from "./trapButton.js";


const EndGameLayout = ({ time, quantEndSetScoredTeams, setquantEndSetScoredTeams, blueTeamNumbers, redTeamNumbers, selAlliance }) => {
  // matrrix of teams and how they scored
  // eslint-disable-next-line

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [ampSelected, setAmpSelected] = useState(false);
  const [speakerSelected, setSpeakerSelected] = useState(false);
  const [trapSelected, setTrapSelected] = useState(false);

  const handleTeamSelect = (number) => {
    setSelectedTeam(number === selectedTeam ? null : number);
  };

  const handleAmpSelect = () => {
    setAmpSelected(!ampSelected);
    setSpeakerSelected(false);
    setTrapSelected(false);
  };

  const handleSpeakerSelect = () => {
    setSpeakerSelected(!speakerSelected);
    setAmpSelected(false);
    setTrapSelected(false);
  };

  const handleTrapSelect = () => {
    setTrapSelected(!trapSelected);
    setAmpSelected(false);
    setSpeakerSelected(false); 
  };

  useEffect(() => {
    if (selectedTeam && (ampSelected || speakerSelected || trapSelected)) {
      const scoringElement = `${ampSelected ? "Amp" : ""}${speakerSelected ? "Speaker" : ""}${trapSelected ? "Trap" : ""}`;
      setquantEndSetScoredTeams(prevTeams => [...prevTeams, [selectedTeam, scoringElement, time.toFixed(2)]]);
      setTimeout(() => {
        setAmpSelected(false);
        setSpeakerSelected(false);
        setTrapSelected(false);
        setSelectedTeam(null);
      }, 30);
    }
    console.log(quantEndSetScoredTeams);
    // eslint-disable-next-line
  }, [selectedTeam, ampSelected, speakerSelected, trapSelected]);

  const getNotificationContent = () => {
    if (selectedTeam && (ampSelected || speakerSelected || trapSelected)) {
      const action = `${ampSelected ? "Amp" : ""}${speakerSelected ? "Speaker" : ""}${trapSelected ? "Trap" : ""}`;
      return `${selectedTeam} scored ${action}`;
    }
    return "";
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
          Endgame
        </div>
      </div>
      <div
        style={{
          color: "rgba(255, 255, 255, 0.50)",
          width: "90%",
          fontSize: "13px",
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
        <TrapButton onSelect={handleTrapSelect} isSelected={trapSelected} />
        <Teams onSelect={handleTeamSelect} selectedTeam={selectedTeam} blueTeamNumbers={blueTeamNumbers} redTeamNumbers={redTeamNumbers} selAlliance={selAlliance} />
        <Notif contents={getNotificationContent()} launchNotif={selectedTeam && (ampSelected || speakerSelected || trapSelected)} />
        
      </div>
    </div>
  );
};

export default EndGameLayout;
