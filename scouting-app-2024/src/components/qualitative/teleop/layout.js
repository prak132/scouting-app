import React from "react";

import QualitativeTable from "./qualitativeTable.js";
import RectangleWithText from "./notesBox.js"

const QualTeleopLayout = ( {time, qualTeleopscoredTeams, qualTeleopsetScoredTeams, qualTeleoptext, qualTeleopsetText, qualTelerows, qualTeleSetRows, qualTeleteamOptions, qualTelesetTeamOptions, blueTeamNumbers, redTeamNumbers, selAlliance} ) => {
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
          Teleop
        </div>
      </div>
      <div
        style={{
          color: "rgba(255, 255, 255, 0.50)",
          width: "90%",
          fontSize: "13px",
        }}
      >
        Qualitiative • {selAlliance === '0' ? "Blue" : "Red"} • Timer: {time.toFixed(2)}s
      </div>
      <QualitativeTable qualTeleopscoredTeams={qualTeleopscoredTeams} qualTeleopsetScoredTeams={qualTeleopsetScoredTeams} qualTelerows={qualTelerows} qualTeleSetRows={qualTeleSetRows} qualTeleteamOptions={qualTeleteamOptions} qualTelesetTeamOptions={qualTelesetTeamOptions} blueTeamNumbers={blueTeamNumbers} redTeamNumbers={redTeamNumbers} selAlliance={selAlliance}/>
      <RectangleWithText qualTeleoptext={qualTeleoptext} qualTeleopsetText={qualTeleopsetText} blueTeamNumbers={blueTeamNumbers} redTeamNumbers={redTeamNumbers} selAlliance={selAlliance}/>
      <div type = "notes">


      </div>

    </div>
  );
};

export default QualTeleopLayout;
