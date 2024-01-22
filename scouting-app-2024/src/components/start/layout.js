import React, { useState } from "react";
import "./TextBox.css";
import matchesData from "./team.json";
import matchDetails from "./match.json";

const TextBox = () => {
  const [nameValue, setNameValue] = useState("");
  const [eventValue, setEventValue] = useState("");
  const [matchValue, setMatchValue] = useState("");
  const [activeButton, setActiveButton] = useState(null);

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleEventChange = (e) => {
    const selectedEvent = e.target.value;
    setEventValue(selectedEvent);
  };

  const handleMatchChange = (e) => {
    setMatchValue(e.target.value);
  };

  const handleBlueButtonClick = () => {
    console.log("bluee");
    setActiveButton("blue");
  };

  const handleRedButtonClick = () => {
    console.log("redd");
    setActiveButton("red");
  };
  const handleQualitiativeButtonClick = () => {
    console.log("Qualitiative");
  };

  const handleQuantitativeButtonClick = () => {
    console.log("Quantitative");
  };


  const handleNextButtonClick = () => {
    const selectedMatch = matchDetails[matchValue];
    if (selectedMatch) {
      const alliance = activeButton === "blue" ? "blue" : "red";
      const teamKeys = selectedMatch.alliances[alliance].team_keys;
      console.log(`${alliance} alliance in ${matchValue}:`, teamKeys);
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
          className={'NextButton QuantitativeButton'}
        >
          Quantitative
        </button>
        <button
          type="button"
          onClick={handleQualitiativeButtonClick}
          className={'NextButton QualitiativeButton'}
        >
          Qualitiative
        </button>
      </div>
      <button
        type="button"
        onClick={handleNextButtonClick}
        className="NextButton Next"
      >
        Next {">"}
      </button>
    </div>
  );
};

export default TextBox;