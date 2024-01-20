import React from "react";
// eslint-disable-next-line
import QualitativeTable from "./qualitativeTable.js";

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
          }}
        >
          Teleop
        </div>
      </div>
      <div
        style={{
          color: "rgba(255, 255, 255, 0.50)",
          width: "100vw",
          fontSize: "4vw",
        }}
      >
        Qualitiative • Timer: 
      </div>
      <QualitativeTable />
      <div type = "notes">


      </div>

    </div>
  );
};

export default QualTeleopLayout;
