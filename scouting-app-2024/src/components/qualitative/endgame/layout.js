import React from "react";

import EndgameTable from "./endgameTable.js";
import EndgameButtons from "./endgameButtons.js";
import RectangleWithButtons from "./teamButtons.js";

const EndGameLayout = () => {
  return (
    <div
      style={{
        paddingTop: "15vh",
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
      <EndgameTable />
      <EndgameButtons />
      <RectangleWithButtons />
      
      <div type = "notes">


      </div>

    </div>
      
  );


};

export default EndGameLayout;
