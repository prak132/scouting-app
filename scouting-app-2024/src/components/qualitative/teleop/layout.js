import React from "react";

import QualitativeTable from "./qualitativeTable.js";
import RectangleWithText from "./notesBox.js"

const QualTeleopLayout = () => {
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
            webkitBackgroundClip: 'text',
            webkitTextFillColor: 'transparent',
          }}
        >
          Teleop
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
      <QualitativeTable />
      <RectangleWithText />
      <div type = "notes">


      </div>

    </div>
  );
};

export default QualTeleopLayout;
