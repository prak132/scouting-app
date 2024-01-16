import React, { useState } from "react";

const teamnums = [
  { Aliance: "B", number: 1678 },
  { Aliance: "B", number: 846 },
  { Aliance: "B", number: 254 },
];

const TeamNumbers = ({ onSelect, selectedTeam }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2vh",
        width: "86vw",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {teamnums.map((team, index) => (
          <div key={index} style={{ margin: "10px" }}>
            <button
              type="button"
              onMouseDown={() => onSelect(team.number)}
              className={
                selectedTeam === team.number ? "teamBTNSelected" : "teamBTN"
              }
              style={
                {
                  // width: 110,
                  // height: 109,
                  // background:
                  //   selectedTeam === team.number
                  //     ? "rgba(145.25, 145.25, 145.25, 0.20)"
                  //     : "rgba(217, 217, 217, 0)",
                  // boxShadow: "0px 0px 30px 5px rgba(255, 255, 255, 0.30)",
                  // borderRadius: 10,
                  // border:
                  //   selectedTeam === team.number
                  //     ? "1px white solid"
                  //     : "1px #2F3953 solid",
                  // display: "flex",
                  // alignItems: "center",
                  // justifyContent: "center",
                  // cursor: "pointer",
                }
              }
            >
              <div
                style={{
                  color:
                    selectedTeam === team.number
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(255, 255, 255, 0.50)",
                  fontSize: 26,
                  fontWeight: "700",
                  wordWrap: "break-word",
                }}
              >
                {team.number}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamNumbers;
