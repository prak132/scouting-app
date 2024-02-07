import React, { useState, useEffect } from "react";
import EndgameTable from "./endgameTable.js";
import EndgameButtons from "./endgameButtons.js";
import TeamButtons from "./teamButtons.js";
import Cookies from 'js-cookie';
import Notif from "./toast.js";

const EndGameLayout = () => {
  const [notifContents, setNotifContents] = useState("");
  const [launchNotif, setLaunchNotif] = useState(false);
  const [teamButtonState, setTeamButtonState] = useState({
    blue: Array(3).fill(false),
    red: Array(3).fill(false)
  });
  // 2 matrixs of teams and how they scored
  const [actions, setActions] = useState({ climbed: [], harmonized: [] });
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
    const actionedTeams = [...selectedBlueTeams, ...selectedRedTeams].join(", ");
    if (selectedBlueTeams.length > 0 || selectedRedTeams.length > 0) {
      setActions(prevActions => ({
        ...prevActions,
        [buttonName + (buttonName.endsWith('ed') ? '' : 'ed')]: [...prevActions[buttonName + (buttonName.endsWith('ed') ? '' : 'ed')], { blue: selectedBlueTeams, red: selectedRedTeams }]
      }));
      setTeamButtonState({ blue: Array(3).fill(false), red: Array(3).fill(false) });
      const actionVerb = buttonName.charAt(0).toUpperCase() + buttonName.slice(1) + (buttonName.endsWith('ed') ? '' : 'ed');
      const notifMessage = actionedTeams.length > 0 ? `${actionedTeams} ${actionVerb.toLowerCase()}` : `${actionVerb} action selected`;
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
        Qualitiative
      </div>
      <div style={{margin: 'auto'}}>
      <div>
      <EndgameTable />
      <EndgameButtons onEndgameButtonClick={handleEndgameButtonClick} />
      <TeamButtons teamButtonState={teamButtonState} setTeamButtonState={setTeamButtonState} />
      <Notif contents={notifContents} launchNotif={launchNotif} setLaunchNotif={setLaunchNotif} />
      </div>
      </div>
      <div type = "notes">
      </div>
    </div>
      
  );


};

export default EndGameLayout;
