import React, { useState, useEffect } from "react";
import "./TextBox.css";

const TextBox = () => {
  const [matchesData, setMatchesData] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [eventValue, setEventValue] = useState("");
  const [matchValue, setMatchValue] = useState("");

  useEffect(() => {
    const matches = new XMLHttpRequest();
    matches.open('GET', 'https://www.thebluealliance.com/api/v3/event/2023cala/matches/keys');
    matches.setRequestHeader('accept', 'application/json');
    matches.setRequestHeader('X-TBA-Auth-Key', 'l3mMnNWP1BVGuj9iEMoqpoZb3Oe18tpmpA79GQShKGBEW63PvIO2e4ksnDDFatbw');
    matches.onload = function() {
      if (matches.status === 200) {
        const data = JSON.parse(matches.responseText);
        const reversedMatches = data.reverse();
        const recentMatches = reversedMatches.slice(0, 1);
        setMatchesData(recentMatches);
      } else {
        console.log("idk broken prolly");
      }
    };
    matches.send();
  }, []);

  const teams = new XMLHttpRequest();
  // eslint-disable-next-line
  const getTeamsData = () => {
    teams.open('GET', 'https://www.thebluealliance.com/api/v3/match/2023cala_sf6m1/simple');
    teams.setRequestHeader('accept', 'application/json');
    teams.setRequestHeader('X-TBA-Auth-Key', 'l3mMnNWP1BVGuj9iEMoqpoZb3Oe18tpmpA79GQShKGBEW63PvIO2e4ksnDDFatbw');
    teams.onload = function() {
        if (teams.status === 200) {
            const data = JSON.parse(teams.responseText);
            console.log(data);
        }
        else {
            console.log("idk broken prolly");
        }
    };
    teams.send();
  }

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleEventChange = (e) => {
    setEventValue(e.target.value);
  };

  const handleMatchChange = (e) => {
    setMatchValue(e.target.value);
  };

  const handleNextButtonClick = () => {
    console.log("test1");
  };

  const handleBlueButtonClick = () => {
    console.log("bluee");
  };

  const handleRedButtonClick = () => {
    console.log("redd");
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
        <select
          value={eventValue}
          onChange={handleEventChange}
        >
          <option value="Test 1">Test 1</option>
          <option value="Test 2">Test 2</option>
        </select>
      </div>
      <div className="glowing-dropdown" style={{ marginTop: "7px" }}>
        <select
          value={matchValue}
          onChange={handleMatchChange}
        >
          {matchesData.map((matchKey, index) => (
            <option key={index} value={matchKey}>
              {matchKey}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleBlueButtonClick}
        className="NextButton"
      >
        Blue Alliance
      </button>
      <button
        type="button"
        onClick={handleRedButtonClick}
        className="NextButton"
      >
        Red Alliance
      </button>
      <button
        type="button"
        onClick={handleNextButtonClick}
        className="NextButton"
      >
        Next {">"}
      </button>
    </div>
  );
};

export default TextBox;