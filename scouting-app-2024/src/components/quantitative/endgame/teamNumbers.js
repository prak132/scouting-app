import React from "react";

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
        alignItems: "center",
        marginTop: "2vh",
        width: "86vw",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-between', width: '100%' }}
      >
        {teamnums.map((team, index) => (
          <div key={index} style={{  }}>
            <button
              type="button"
              onMouseDown={() => onSelect(team.number)}
              className={
                selectedTeam === team.number ? "teamBTNSelected" : "teamBTN"
              }
            >
              <div
                style={{
                  color:
                    selectedTeam === team.number
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(255, 255, 255, 0.50)",
                    fontFamily: 'Poppins',
                    fontSize: '26px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
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
