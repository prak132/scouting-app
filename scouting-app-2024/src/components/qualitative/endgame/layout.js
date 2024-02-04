import React, { useState, useEffect } from "react";
import EndgameTable from "./endgameTable.js";
import EndgameButtons from "./endgameButtons.js";
import TeamButtons from "./teamButtons.js";
import Cookies from 'js-cookie';

const EndGameLayout = () => {
  const [teamButtonState, setTeamButtonState] = useState({
    blue: Array(3).fill(false),
    red: Array(3).fill(false)
  });
  const [actions, setActions] = useState({ climb: [], harmonize: [] });
  useEffect(() => {
    console.log("Actions:", actions);
  }, [actions]);
  const blueTeamNumbers = JSON.parse(Cookies.get("blueTeamNumbers")) || [];
  const redTeamNumbers = JSON.parse(Cookies.get("redTeamNumbers")) || [];
  const handleEndgameButtonClick = (buttonName) => {
    const selectedBlueTeams = teamButtonState.blue
      .map((state, index) => state ? blueTeamNumbers[index] : null)
      .filter(number => number !== null);
    const selectedRedTeams = teamButtonState.red
      .map((state, index) => state ? redTeamNumbers[index] : null)
      .filter(number => number !== null);
    setActions(prevActions => ({
      ...prevActions,
      [buttonName]: [...prevActions[buttonName], { blue: selectedBlueTeams, red: selectedRedTeams }]
    }));
    setTeamButtonState({ blue: Array(3).fill(false), red: Array(3).fill(false) });
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
          width: "70vw",
          fontSize: "4vw",
        }}
      >
        Qualitiative
      </div>
      <div style={{margin: 'auto'}}>
      <div>
      <EndgameTable />
      <EndgameButtons onEndgameButtonClick={handleEndgameButtonClick} />
      <TeamButtons teamButtonState={teamButtonState} setTeamButtonState={setTeamButtonState} />
      </div>
      </div>
      <div type = "notes">


      </div>

    </div>
      
  );


};

export default EndGameLayout;
