import React, { useState } from "react";

const teamnums = [
    { Aliance: 'B', number: 1678 },
    { Aliance: 'B', number: 846 },
    { Aliance: 'B', number: 254 }
];

const TeamNumbers = () => {
    const [selectedTeam, setSelectedTeam] = useState(null);

    const handleTeamSelect = (number) => {
        setSelectedTeam(number === selectedTeam ? null : number);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '24vh' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {teamnums.map((team, index) => (
                    <div key={index} style={{ margin: '10px' }}>
                        <button
                            type="button"
                            onMouseDown={() => handleTeamSelect(team.number)}
                            style={{
                                width: 110,
                                height: 109,
                                background: selectedTeam === team.number ? 'rgba(145.25, 145.25, 145.25, 0.20)' : 'rgba(217, 217, 217, 0)',
                                boxShadow: '0px 0px 30px 5px rgba(255, 255, 255, 0.30)',
                                borderRadius: 10,
                                border: selectedTeam === team.number ? '1px white solid' : '1px #2F3953 solid',
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{ color: selectedTeam === team.number ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.50)', fontSize: 26, fontWeight: '700', wordWrap: 'break-word' }}>
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
