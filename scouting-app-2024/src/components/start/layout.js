import React, { useState } from "react";
import "./TextBox.css";

const TextBox = () => {
  const matches = new XMLHttpRequest();
  const getMatchData = () => {
    matches.open('GET', 'https://www.thebluealliance.com/api/v3/event/2023cala/matches/keys');
    matches.setRequestHeader('accept', 'application/json');
    matches.setRequestHeader('X-TBA-Auth-Key', 'l3mMnNWP1BVGuj9iEMoqpoZb3Oe18tpmpA79GQShKGBEW63PvIO2e4ksnDDFatbw');
    matches.onload = function() {
        if (matches.status === 200) {
            const data = JSON.parse(matches.responseText);
            console.log(data);
        }
        else {
          console.log("idk broken prolly");
        }
    };
    matches.send();
  }
  const teams = new XMLHttpRequest();
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
  getMatchData();
  getTeamsData();
  const [nameValue, setNameValue] = useState("");
  const [matchValue, setMatchValue] = useState("");

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleMatchChange = (e) => {
    setMatchValue(e.target.value);
  };

  const handleNextButtonClick = () => {
    console.log("test1");
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
      <div className="textbox-container" style={{ marginTop: "7px" }}>
        <input
          type="text"
          value={matchValue}
          onChange={handleMatchChange}
          className="glowing-textbox text"
          placeholder="Match #"
        />
      </div>
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
