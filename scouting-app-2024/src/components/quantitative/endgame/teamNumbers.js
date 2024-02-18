import React from "react";

const TeamNumbers = ({ onSelect, selectedTeam, blueTeamNumbers, redTeamNumbers, selAlliance}) => {
  const teamNumbers = selAlliance === "0" ? (Array.isArray(blueTeamNumbers) ? blueTeamNumbers : []) : selAlliance === "1" ? (Array.isArray(redTeamNumbers) ? redTeamNumbers : []) : [];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "86vw",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-between', width: '100%' }}
      >
      {teamNumbers.map((team, index) => (
        <div key={index} style={{}}>
          <button
            type="button"
            onMouseDown={() => onSelect(team)}
            className={
              selectedTeam === team ? "teamBTNSelected" : "teamBTN"
            }
          >
            <div
              style={{
                color:
                  selectedTeam === team
                    ? "rgba(255, 255, 255, 1)"
                    : "rgba(255, 255, 255, 0.50)",
                fontFamily: 'Poppins',
                fontSize: '26px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal',
              }}
            >
              {team}
            </div>
          </button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default TeamNumbers;
