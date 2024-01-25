import React, { useState, useEffect } from 'react';
import "./App.css";
import Cookies from "js-cookie";
import AutoLayout from "./components/auto/layout.js";
import QuantTeleopLayout from "./components/quantitative/teleop/layout.js";
import QuantEndGameLayout from "./components/quantitative/endgame/layout.js";
import QualTeleopLayout from "./components/qualitative/teleop/layout.js";
import QualEndGameLayout from "./components/qualitative/endgame/layout.js";
import PageButtons from "./components/navigationButtons";
import MenuElements from "./components/menus.js";
import matchesData from "./data/team.json";
import matchDetails from "./data/match.json";

function App() {
  const [activeButton, setActiveButton] = useState(null);
  const [modeActiveButton, setModeActiveButton] = useState(null);
  const qualpages = [AutoLayout, QualTeleopLayout, QualEndGameLayout];
  const quantpages = [AutoLayout, QuantTeleopLayout, QuantEndGameLayout];
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const newPages = modeActiveButton === 'quan' ? quantpages : qualpages;
    setPages(newPages);
  }, [modeActiveButton]);

  const handleLeftButtonClick = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : pages.length - 1));
  };

  const handleRightButtonClick = () => {
    setCurrentPage((prevPage) => (prevPage < pages.length - 1 ? prevPage + 1 : 0));
  };

  const [pagesxww, setPages] = useState([]);
  Cookies.set("teamNumbers", JSON.stringify(["hey", "go", "back"]));
  const [nameValue, setNameValue] = useState("");
  const [matchValue, setMatchValue] = useState("");

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

  const handleQualitativeButtonClick = () => {
    setModeActiveButton("qual");
    setCurrentPage(0);
  };

  const handleQuantitativeButtonClick = () => {
    setModeActiveButton("quan");
    setCurrentPage(0);
  };

  const handleNextButtonClick = () => {
    const selectedMatch = matchDetails[matchValue];
    if (selectedMatch) {
      const alliance = activeButton === "blue" ? "blue" : "red";
      const teamKeys = selectedMatch.alliances[alliance].team_keys;
      const teamNumbers = teamKeys.map((team) => team.replace("frc", ""));
      Cookies.set("teamNumbers", JSON.stringify(teamNumbers));
    } else {
      console.log(`Match details not found for ${matchValue}`);
    }
  };

  return (
    <div >
      <MenuElements/>
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
            onClick={handleQualitativeButtonClick}
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
    <div>
      {pages.length > 0 && React.createElement(pages[currentPage])}
    </div>
    <PageButtons onLeftButtonClick={handleLeftButtonClick} onRightButtonClick={handleRightButtonClick} />
    </div>
  );
}

export default App;