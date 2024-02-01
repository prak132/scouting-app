import React, { useState } from "react";
import Cookies from "js-cookie";
import "./TextBox.css";
import matchesData from "./data/match.json";
import matchDetails from "./data/team.json";


const TextBox = ({ setQuantitativeMode, onNextButtonClick }) => {
  const bug = ["hey", "go", "back"];
  Cookies.set("selAlliance", "1");
  Cookies.set("blueTeamNumbers", JSON.stringify(bug));
  Cookies.set("redTeamNumbers", JSON.stringify(bug));
  const [nameValue, setNameValue] = useState("");
  const [matchValue, setMatchValue] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [modeActiveButton, setModeActiveButton] = useState(null);


  const handleNameChange = (e) => {
    setNameValue(e.target.value);
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
      const selectedMatch = matchDetails[matchValue];
      if (selectedMatch) {
        const alliance = activeButton === "blue" ? "blue" : "red";
        const blueTeamKeys = selectedMatch.alliances.blue.team_keys.map((team) =>team.replace("frc", ""));
        const redTeamKeys = selectedMatch.alliances.red.team_keys.map((team) => team.replace("frc", ""));
        Cookies.set("blueTeamNumbers", JSON.stringify(blueTeamKeys));
        Cookies.set("redTeamNumbers", JSON.stringify(redTeamKeys));
        Cookies.set("selAlliance", alliance === "blue" ? "0" : "1");
      } else {
        console.log(`Match details not found for ${matchValue}`);
      }
    
      if (onNextButtonClick) {
        onNextButtonClick();
      }
    };

  return (
    <div className="center-container">
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
        />
        <datalist id="matchOptions">
          {matchesData.map((matchKey, index) => (
            <option key={index} value={matchKey} />
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
        className={`NextButton Next ${
          nameValue.trim() !== "" &&
          matchValue !== "" &&
          (activeButton === "blue" || activeButton === "red") &&
          (modeActiveButton === "quan" || modeActiveButton === "qual")
            ? "glow"
            : ""
        }`}
      >
        Next {">"}
      </button>
    </div>
 );
};


export default TextBox;