import React, { useState, useEffect } from "react";
import EndgameTable from "./endgameTable.js";
import EndgameButtons from "./endgameButtons.js";
import TeamButtons from "./teamButtons.js";
import Notif from "./toast.js";

const EndGameLayout = ( {time, qualEndscoredTeams, qualEndsetScoredTeams, qualEndactions, qualEndsetActions, teamButtonState, setTeamButtonState, qualEndRows, qualEndSetRows, qualEndTeamOptions, qualEndSetTeamOptions, blueTeamNumbers, redTeamNumbers, selAlliance}) => {
  const [notifContents, setNotifContents] = useState("");
  const [launchNotif, setLaunchNotif] = useState(false);

  useEffect(() => {
    console.log("Actions:", qualEndactions);
  }, [qualEndactions]);

  const handleEndgameButtonClick = (buttonName) => {
    const selectedBlueTeams = teamButtonState.blue
      .map((state, index) => state ? [blueTeamNumbers[index], time.toFixed(2)] : null)
      .filter(item => item !== null);
    const selectedRedTeams = teamButtonState.red
      .map((state, index) => state ? [redTeamNumbers[index], time.toFixed(2)] : null)
      .filter(item => item !== null);
    if (selectedBlueTeams.length > 0 || selectedRedTeams.length > 0) {
      qualEndsetActions(prevActions => {
        const existingAction = prevActions[buttonName] || { blue: [], red: [] };
        const blueArray = Array.isArray(existingAction.blue) ? existingAction.blue : [];
        const redArray = Array.isArray(existingAction.red) ? existingAction.red : [];
        const updatedAction = {
          blue: [...blueArray, ...selectedBlueTeams],
          red: [...redArray, ...selectedRedTeams],
        };
        return {
          ...prevActions,
          [buttonName]: updatedAction,
        };
      });
      setTeamButtonState({ blue: Array(3).fill(false), red: Array(3).fill(false) });
      const actionVerb = buttonName.charAt(0).toUpperCase() + buttonName.slice(1);
      const notifMessage = `Selected teams have been ${actionVerb.toLowerCase()} for ${selectedBlueTeams.concat(selectedRedTeams).map(item => item[0]).join(", ")}`;
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
      <EndgameButtons onEndgameButtonClick={handleEndgameButtonClick} />
      <TeamButtons teamButtonState={teamButtonState} setTeamButtonState={setTeamButtonState} blueTeamNumbers={blueTeamNumbers} redTeamNumbers={redTeamNumbers} />
      <Notif contents={notifContents} launchNotif={launchNotif} setLaunchNotif={setLaunchNotif} />
      </div>
      </div>
      <div type = "notes">
      </div>
    </div>
      
  );


};

export default EndGameLayout;
