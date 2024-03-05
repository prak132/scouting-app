import React, { useState, useEffect } from "react";
import EndgameTable from "./endgameTable.js";
import EndgameButtons from "./endgameButtons.js";
import TeamButtons from "./teamButtons.js";
import Notif from "./toast.js";

const EndGameLayout = ( {time, qualEndscoredTeams, qualEndsetScoredTeams, qualEndactions, qualEndsetActions, teamButtonState, setTeamButtonState, qualEndRows, qualEndSetRows, qualEndTeamOptions, qualEndSetTeamOptions, blueTeamNumbers, redTeamNumbers, selAlliance}) => {
  const [notifContents, setNotifContents] = useState("");
  const [launchNotif, setLaunchNotif] = useState(false);
  const [teamsClimbed, setTeamsClimbed] = useState([]);

  useEffect(() => {
    console.log("Actions:", qualEndactions);
  }, [qualEndactions]);

  const handleEndgameButtonClick = (buttonName) => {
    const teamNumbers = selAlliance === "0" ? blueTeamNumbers : redTeamNumbers;
    const selectedTeams = teamButtonState[selAlliance === "0" ? 'blue' : 'red']
      .map((state, index) => state ? [teamNumbers[index], time.toFixed(2)] : null)
      .filter(item => item !== null);
    if (selectedTeams.length < 2 && buttonName === "harmonized") {
      setNotifContents("You need to select two teams to harmonize.");
      setLaunchNotif(true);
      return;
    } else if (selectedTeams.length > 0) {
      if (buttonName === "climbed") {
        setTeamsClimbed([...teamsClimbed, ...selectedTeams.map(item => item[0])]);
      }
      qualEndsetActions(prevActions => {
        const existingAction = prevActions[buttonName] || { blue: [], red: [] };
        const array = Array.isArray(existingAction[selAlliance === "0" ? 'blue' : 'red']) ? existingAction[selAlliance === "0" ? 'blue' : 'red'] : [];
        const updatedAction = {
          ...existingAction,
          [selAlliance === "0" ? 'blue' : 'red']: [...array, ...selectedTeams],
        };
        return {
          ...prevActions,
          [buttonName]: updatedAction,
        };
      });
      setTeamButtonState({ blue: Array(3).fill(false), red: Array(3).fill(false) });
      const actionVerb = buttonName.charAt(0).toUpperCase() + buttonName.slice(1);
      const notifMessage = `${selectedTeams.map(item => item[0]).join(", ")} ${actionVerb.toLowerCase()}`;
      setNotifContents(notifMessage);
      setLaunchNotif(true);
    }
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
        Qualitiative • Timer: {time.toFixed(2)}s
      </div>
      <div style={{margin: 'auto'}}>
      <div>
      <EndgameTable qualEndscoredTeams={qualEndscoredTeams} qualEndsetScoredTeams={qualEndsetScoredTeams} rows={qualEndRows} setRows={qualEndSetRows} teamOptions={qualEndTeamOptions} setTeamOptions={qualEndSetTeamOptions} blueTeamNumbers={blueTeamNumbers} redTeamNumbers={redTeamNumbers} selAlliance={selAlliance}/>
      <EndgameButtons onEndgameButtonClick={handleEndgameButtonClick} qualEndactions={qualEndactions} teamsClimbed={teamsClimbed} selAlliance={selAlliance}/>
      <TeamButtons teamButtonState={teamButtonState} setTeamButtonState={setTeamButtonState} blueTeamNumbers={blueTeamNumbers} redTeamNumbers={redTeamNumbers} selAlliance={selAlliance}/>
      <Notif contents={notifContents} launchNotif={launchNotif} setLaunchNotif={setLaunchNotif} />
      </div>
      </div>
      <div type = "notes">
      </div>
    </div>
      
  );


};

export default EndGameLayout;