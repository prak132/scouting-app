import React, { useState } from "react";
import Cookies from "js-cookie";
import "./TextBox.css";
import matchesData from "./data/team.json";
import matchDetails from "./data/match.json";

const TextBox = ({ onQualitativeButtonClick, onQuantitativeButtonClick }) => {
  Cookies.set("teamNumbers", JSON.stringify(["hey","go","back"]));
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
    onQualitativeButtonClick();
  };

  const handleQuantitativeButtonClick = () => {
    setModeActiveButton("quan");
    onQuantitativeButtonClick();
  };


  const handleNextButtonClick = () => {
    const selectedMatch = matchDetails[matchValue];
    if (selectedMatch) {
      const alliance = activeButton === "blue" ? "blue" : "red";
      const teamKeys = selectedMatch.alliances[alliance].team_keys;
      const teamNumbers = teamKeys.map(team => team.replace("frc", ""));
      Cookies.set("teamNumbers", JSON.stringify(teamNumbers));
    } else {
      console.log(`Match details not found for ${matchValue}`);
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
          className={`NextButton BlueButton ${activeButton === "blue" ? "active" : ""}`}
        >
          Blue
        </button>
        <button
          type="button"
          onClick={handleRedButtonClick}
          className={`NextButton RedButton ${activeButton === "red" ? "active" : ""}`}
        >
          Red
        </button>
      </div>
      <div className="button-container">
        <button
          type="button"
          onClick={handleQuantitativeButtonClick}
          className={`NextButton QuantitativeButton ${modeActiveButton === "quan" ? "active" : ""}`}
        >
          Quantitative
        </button>
        <button
          type="button"
          onClick={handleQualitiativeButtonClick}
          className={`NextButton QualitiativeButton ${modeActiveButton === "qual" ? "active" : ""}`}
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