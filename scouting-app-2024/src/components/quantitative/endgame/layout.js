import React, { useState, useEffect } from "react";
import AmpButton from "./ampButton.js";
import SpeakerButton from "./speakerButton.js";
import Teams from "./teamNumbers.js";
import Notif from "./toast.js";
import UndoInfo from "./undoinfo.js";
import TrapButton from "./trapButton.js";

const EndGameLayout = () => {
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

  const [storedTeam, setStoredTeam] = useState('846');
  const [storedElement, setStoredElement] = useState('');

  useEffect(() => {
    const scored = () => {
      if (selectedTeam && (ampSelected || speakerSelected || trapSelected)) {
        setStoredTeam(selectedTeam);
        setStoredElement(`${ampSelected ? "Amp" : ""}${speakerSelected ? "Speaker" : ""}${trapSelected ? "Trap" : ""}`);

        const resetValues = () => {
          setAmpSelected(false);
          setSpeakerSelected(false);
          setTrapSelected(false);
          setSelectedTeam(null);
        };

        setTimeout(resetValues, 30);
      }
    };

    scored();
  }, [selectedTeam, ampSelected, speakerSelected, trapSelected]);

  function callNotif() {
    if (selectedTeam && (ampSelected || speakerSelected || trapSelected)) {
      return true;
    };
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
            background: '-webkit-linear-gradient(#eee, #333)',
            webkitBackgroundClip: 'text',
            webkitTextFillColor: 'transparent',
          }}
        >
          Endgame
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

      <div>
        <AmpButton onSelect={handleAmpSelect} isSelected={ampSelected} />
        <SpeakerButton
          onSelect={handleSpeakerSelect}
          isSelected={speakerSelected}
        />
        <TrapButton onSelect={handleTrapSelect} isSelected={trapSelected} />
        <Teams onSelect={handleTeamSelect} selectedTeam={selectedTeam} />
        <UndoInfo />
        <Notif contents={storedTeam + ' scored ' + storedElement} launchNotif={callNotif()} />
        
      </div>
      <div>
        
        
      </div>
    </div>
  );
};

export default EndGameLayout;
