import React, { useState } from "react";
import "./TextBox.css";
import Cookies from "js-cookie";
import matchesData from "./data/match.json";
import matchDetails from "./data/team.json";
import Notif from "./toast.js";

const TextBox = ({ setQuantitativeMode, onNextButtonClick, nameValue, setNameValue, matchValue, setMatchValue, activeButton, setActiveButton, modeActiveButton, setModeActiveButton, setBlueTeamNumbers, setRedTeamNumbers, setSelAlliance, handleOVMButtonClick}) => {    
  const [showNotif, setShowNotif] = useState(false);

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
    Cookies.set("nameVal", JSON.stringify(`${e.target.value}`));
  };

  const handleMatchChange = (e) => {
    setMatchValue(e.target.value);
  };


  const handleBlueButtonClick = () => {
    setActiveButton("blue");
  };


  const handleRedButtonClick = () => {
    setActiveButton("red");
  };


  const handleQualitiativeButtonClick = () => {
    setModeActiveButton("qual");
    if (setQuantitativeMode) {
      setQuantitativeMode(false);
    }
  };

  const handleQuantitativeButtonClick = () => {
    setModeActiveButton("quan");
    if (setQuantitativeMode) {
      setQuantitativeMode(true);
    }
  };

  const handleNextButtonClick = () => {
    const selectedMatch = matchDetails["2024sunshow_qm"+matchValue];
    if (selectedMatch) {
      const alliance = activeButton === "blue" ? "blue" : "red";
      const blueTeamKeys = selectedMatch.blue;
      const redTeamKeys = selectedMatch.red;
      setBlueTeamNumbers(blueTeamKeys);
      setRedTeamNumbers(redTeamKeys);
      setSelAlliance(alliance === "blue" ? "0" : "1");
      if (onNextButtonClick) {
        onNextButtonClick();
      }
    } else {
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 2000);
    }
  };

  return (
    <div className="center-container">
      {showNotif && <Notif contents="Match Not Found" launchNotif={showNotif} />}
      <button
          type="button"
          onClick={handleOVMButtonClick}
          className={`OVMButton`}
        >
        Observer Mode
      </button>
      <div className="textbox-container">
        <input
          type="text"
          value={nameValue}
          onChange={handleNameChange}
          className="glowing-textbox text"
          placeholder="Name"
          id="nameInput"
        />
      </div>
      <div className="glowing-dropdown" style={{ marginTop: "7px" }}>
        <input
          type="text"
          list="matchOptions"
          value={matchValue}
          onChange={handleMatchChange}
          placeholder="Select a match"
          className="glowing-dropdown-input text"
          id="matchInput"
          inputMode="numeric"
          pattern="[0-9]*"        
        />
        <datalist id="matchOptions">
          {matchesData.map((matchKey, index) => (
            <option key={index} value={matchKey.replace('2024sunshow_qm', '')} />
          ))}
        </datalist>
      </div>
      <div className="button-container">
        <button
          type="button"
          onClick={handleBlueButtonClick}
          className={`NextButton BlueButton ${
            activeButton === "blue" ? "active" : ""
          }`}
        >
          Blue
        </button>
        <button
          type="button"
          onClick={handleRedButtonClick}
          className={`NextButton RedButton ${
            activeButton === "red" ? "active" : ""
          }`}
        >
          Red
        </button>
      </div>
      <div className="button-container">
        <button
          type="button"
          onClick={handleQuantitativeButtonClick}
          className={`NextButton QuantitativeButton ${
            modeActiveButton === "quan" ? "active" : ""
          }`}
        >
          Quantitative
        </button>
        <button
          type="button"
          onClick={handleQualitiativeButtonClick}
          className={`NextButton QualitiativeButton ${
            modeActiveButton === "qual" ? "active" : ""
          }`}
        >
          Qualitative
        </button>
      </div>
      <button
        type="button"
        onClick={handleNextButtonClick}
        disabled={
          !(nameValue.trim() !== "" && matchValue !== "" && (activeButton === "blue" || activeButton === "red") && (modeActiveButton === "quan" || modeActiveButton === "qual"))
        }
        className={`NextButton Next ${
          nameValue.trim() !== "" && matchValue !== "" && (activeButton === "blue" || activeButton === "red") && (modeActiveButton === "quan" || modeActiveButton === "qual") ? "glow" : ""
        }`}
      >
        Next {">"}
      </button>
    </div>
 );
};


export default TextBox;