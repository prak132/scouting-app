import React, { useState, useEffect } from 'react';

const DevPage = ({ blueTeamNumbers, redTeamNumbers, selAlliance }) => {
  const [rows, setRows] = useState(Array.from({ length: 3 }, (_, index) => index + 1));
  const [teamOptions, setTeamOptions] = useState([]);
  const [scoredTeams, setScoredTeams] = useState([]);

  useEffect(() => {
    const teamNumbers = selAlliance === "0" ? (Array.isArray(blueTeamNumbers) ? blueTeamNumbers : []) : selAlliance === "1" ? (Array.isArray(redTeamNumbers) ? redTeamNumbers : []) : [];
    const options = teamNumbers.map((team) => (
      <option key={team} value={`team${team}`}>
        {team}
      </option>
    ));
    options.unshift(<option key="default" value="">Team</option>);
    setTeamOptions(options);
    // eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    console.log(scoredTeams);
  }, [scoredTeams]);

  const addRow = () => {
    setRows([rows.length + 1, ...rows]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
    setScoredTeams(scoredTeams.filter((_, i) => i !== index));
  };

  const handleTeamSelect = (index, team) => {
    const newScoredTeams = [...scoredTeams];
    newScoredTeams[index] = [team.replace('team', ''), newScoredTeams[index]?.[1]];
    setScoredTeams(newScoredTeams);
  };

  const handleDefenseSelect = (index, defense) => {
    const newScoredTeams = [...scoredTeams];
    newScoredTeams[index] = [newScoredTeams[index]?.[0], defense];
    setScoredTeams(newScoredTeams);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div
        className="content-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          maxHeight: '250px',
          overflowY: 'scroll',
          padding: '14px',
          backgroundColor: '#000614',
          borderRadius: '10px',
          boxShadow: '0px 0px 35px 1px rgba(255, 255, 255, 0.1)',
        }}
      >
        {rows.map((row, index) => (
          <div
            key={row}
            className="row"
            style={{
              marginBottom: '13px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <select
              className="team-select"
              onChange={(e) => handleTeamSelect(index, e.target.value)}
              value={scoredTeams[index]?.[0] ? `team${scoredTeams[index][0]}` : ""}
              style={{
                width: '100px',
                flex: 0.4,
                flexShrink: 0,
                padding: '8px',
                backgroundColor: '#000614',
                border: '1px solid #2F3953',
                borderRadius: '10px',
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: 'normal',
                boxShadow: '2px 0px 22px 1px rgba(255, 255, 255, 0.1)',
              }}
            >
              {teamOptions}
            </select>
            <select
              className="defense-select"
              onChange={(e) => handleDefenseSelect(index, e.target.value)}
              value={scoredTeams[index]?.[1] || ""}
              style={{
                marginLeft: '10px',
                width: '100px',
                flex: 1,
                padding: '8px',
                fontFamily: 'Poppins',
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.7)',
                backgroundColor: '#000614',
                border: '1px solid #2F3953',
                borderRadius: '10px',
                boxShadow: '0px 0px 35px 1px rgba(255, 255, 255, 0.1)',
              }}
            >
              <option value="">Defense</option>
              {[1, 2, 3, 4, 5].map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
            <button
              className="delete-button"
              onClick={() => removeRow(index)}
              style={{
                marginLeft: '10px',
                backgroundColor: 'transparent',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '30px',
                border: 'none',
                borderRadius: '10px',
                boxShadow: '0px 0px 35px 1px rgba(255, 255, 255, 0.1)',
              }}
            >
              -
            </button>
          </div>
        ))}
        <button
          className="add-button"
          onClick={addRow}
          style={{
            alignSelf: 'flex-start',
            marginTop: '10px',
            backgroundColor: 'transparent',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '25px',
            border: '1px solid #2F3953',
            borderRadius: '10px',
            boxShadow: '0px 0px 35px 1px rgba(255, 255, 255, 0.1)',
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default DevPage;