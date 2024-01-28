import React from "react";
import Cookies from "js-cookie";

const TeamNumbers = ({ onSelect, selectedTeam }) => {
  const selAlliance = Cookies.get("selAlliance");
  const teamNumbers = selAlliance === "0" ? JSON.parse(Cookies.get("blueTeamNumbers")) || [] : selAlliance === "1" ? JSON.parse(Cookies.get("redTeamNumbers")) || [] : [];
    return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "2vh",
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
