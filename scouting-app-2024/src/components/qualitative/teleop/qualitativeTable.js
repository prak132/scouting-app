import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const QualitativeTable = ( {qualTeleopscoredTeams, qualTeleopsetScoredTeams} ) => {
  const [rows, setRows] = useState(Array.from({ length: 3 }, (_, index) => index + 1));
  const [teamOptions, setTeamOptions] = useState([]);

  // matrrix of teams and how they defended
  
  useEffect(() => {
    const selAlliance = Cookies.get("selAlliance");
    const teamNumbers = selAlliance === "0" ? JSON.parse(Cookies.get("blueTeamNumbers")) || [] : selAlliance === "1" ? JSON.parse(Cookies.get("redTeamNumbers")) || [] : [];
    const options = teamNumbers.map((team) => (
      <option key={team} value={`team${team}`}>
        {team}
      </option>
    ));
    options.unshift(<option key="default" value="">Team</option>);
    setTeamOptions(options);
  }, []);
  
  useEffect(() => {
    console.log(qualTeleopscoredTeams);
  }, [qualTeleopscoredTeams]);

  const addRow = () => {
    setRows([rows.length + 1, ...rows]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
    qualTeleopsetScoredTeams(qualTeleopscoredTeams.filter((_, i) => i !== index));
  };

  const handleTeamSelect = (index, team) => {
    const newScoredTeams = [...qualTeleopscoredTeams];
    newScoredTeams[index] = [team.replace('team', ''), newScoredTeams[index]?.[1]];
    qualTeleopsetScoredTeams(newScoredTeams);
  };  

  const handleDefenseSelect = (index, defense) => {
    const defenseMapping = {
      'option1': 'source',
      'option2': 'center'
    };
    const newScoredTeams = [...qualTeleopscoredTeams];
    newScoredTeams[index] = [newScoredTeams[index]?.[0], defenseMapping[defense]];
    qualTeleopsetScoredTeams(newScoredTeams);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', height: '250px' }}>
      <div
        className="scrollable-container"
        style={{
          height: '100%',
          maxHeight: '250px',
          backgroundColor: '#000614',
          overflowY: 'scroll',
          padding: '14px',
          marginTop: '10px',
        }}
      >
        <div
          style={{
            marginBottom: '13px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div
            className="team-select"
            style={{
              flex: 0.4,
              flexShrink: 0,
              padding: '8px',
              paddingLeft: '10px',
              backgroundColor: '#000614',
              border: '1px solid #2F3953',
              borderRadius: '10px',
              color: 'rgba(255, 255, 255, 0.25)',
              fontFamily: 'Poppins',
              background: 'rgba(217, 217, 217, 0.00)',
              fontSize: '16px',
              fontStyle: 'normal',
              lineHeight: 'normal',
              boxShadow: '2px 0px 22px 1px rgba(255, 255, 255, 0.1)',
            }}
          >
            Team
          </div>
          <div
            className="defense-select"
            style={{
              marginLeft: '10px',
              flex: 1,
              padding: '8px',
              paddingLeft: '12px',
              fontFamily: 'poppins',
              fontSize: '16px',
              color: '#FFFFFF40',
              backgroundColor: '#000614',
              background: 'rgba(217, 217, 217, 0.00)',
              border: '1px solid #2F3953',
              borderRadius: '10px',
              boxShadow: '0px 0px 35px 1px rgba(255, 255, 255, 0.1)',
            }}
          >
            Defense
          </div>
          <button
            className="add-button"
            onClick={addRow}
            style={{
              flex: 0.1,
              marginLeft: '10px',
              backgroundColor: 'transparent',
              border: '1px solid #2F3953',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '25px',
              background: 'rgba(217, 217, 217, 0.00)',
              borderRadius: '10px',
              boxShadow: '0px 0px 35px 1px rgba(255, 255, 255, 0.1)',
            }}
          >
            +
          </button>
        </div>
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
              value={qualTeleopscoredTeams[index]?.[0] ? `team${qualTeleopscoredTeams[index][0]}` : ""}
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
                background: 'rgba(217, 217, 217, 0.00)',
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
              value={qualTeleopscoredTeams[index]?.[1] ? (qualTeleopscoredTeams[index][1] === 'source' ? 'option1' : 'option2') : ""}
              style={{
                marginLeft: '10px',
                flex: 1,
                height: '44px',
                padding: '8px',
                fontFamily: 'poppins',
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.7)',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: 'normal',
                backgroundColor: '#000614',
                background: 'rgba(217, 217, 217, 0.00)',
                border: '1px solid #2F3953',
                borderRadius: '10px',
                boxShadow: '0px 0px 35px 1px rgba(255, 255, 255, 0.1)',
              }}
            >
              <option value="">Defense</option>
              <option value="option1">Source</option>
              <option value="option2">Center</option>
            </select>
            <button
              className="delete-button"
              onClick={() => removeRow(index)}
              style={{
                flex: 0.1,
                marginLeft: '10px',
                backgroundColor: 'transparent',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '30px',
                background: 'rgba(217, 217, 217, 0.00)',
                border: '1px solid #2F3953',
                borderRadius: '10px',
                boxShadow: '0px 0px 35px 1px rgba(255, 255, 255, 0.1)',
              }}
            >
              -
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QualitativeTable;