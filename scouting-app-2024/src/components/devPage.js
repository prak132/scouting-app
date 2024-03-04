import React, { useEffect } from 'react';
import matchesData from "../data/match.json";

const DevPage = ({ blueTeamNumbers, redTeamNumbers, selAlliance, matchValue, setMatchValue, devRows, devSetRows, devTeamOptions, devSetTeamOptions, devScoredTeams, devSetScoredTeams, handleFinishClick }) => {
  useEffect(() => {
    const blueTeams = Array.isArray(blueTeamNumbers) ? blueTeamNumbers : [];
    const redTeams = Array.isArray(redTeamNumbers) ? redTeamNumbers : [];
    const teamNumbers = [...blueTeams, ...redTeams];
    const options = teamNumbers.map((team) => (
      <option key={team} value={`team${team}`}>
        {team}
      </option>
    ));
    
    options.unshift(<option key="default" value="">Team</option>);
    devSetTeamOptions(options);
    // eslint-disable-next-line
  }, [blueTeamNumbers, redTeamNumbers]);

  const handleMatchChange = (e) => {
    setMatchValue(e.target.value);
  };

  useEffect(() => {
    console.log(devScoredTeams);
  }, [devScoredTeams]);

  const addRow = () => {
    devSetRows([devRows.length + 1, ...devRows]);
  };

  const removeRow = (index) => {
    devSetRows(devRows.filter((_, i) => i !== index));
    devSetScoredTeams(devScoredTeams.filter((_, i) => i !== index));
  };

  const handleTeamSelect = (index, team) => {
    const newScoredTeams = [...devScoredTeams];
    newScoredTeams[index] = [team.replace('team', ''), newScoredTeams[index]?.[1]];
    devSetScoredTeams(newScoredTeams);
  };

  const handleDefenseSelect = (index, defense) => {
    const newScoredTeams = [...devScoredTeams];
    newScoredTeams[index] = [newScoredTeams[index]?.[0], defense];
    devSetScoredTeams(newScoredTeams);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div
        className="content-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          maxHeight: '400px',
          overflowY: 'scroll',
          padding: '14px',
          backgroundColor: '#000614',
          borderRadius: '10px',
          boxShadow: '0px 0px 35px 1px rgba(255, 255, 255, 0.1)',
        }}
      >
        <div>
          <input
            type="text"
            list="matchOptions"
            value={matchValue}
            onChange={handleMatchChange}
            placeholder="Select a match"
            className="glowing-dropdown-input text"
            id="matchInput"
          />
          <datalist id="matchOptions">
            {matchesData.map((matchKey, index) => (
              <option key={index} value={matchKey.replace("2024casj_qm","")} />
            ))}
          </datalist>
        </div>
          <div style={{ display: 'flex', marginTop: '10px', marginBottom: '10px',}}>
            <button
              className="add-button"
              onClick={addRow}
              style={{
                alignSelf: 'flex-start',
                marginRight: '10px',
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
              <button
                className="finish-button"
                onClick={handleFinishClick}
                style={{
                  marginRight: '10px',
                  backgroundColor: 'transparent',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '25px',
                  border: '1px solid #2F3953',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 35px 1px rgba(255, 255, 255, 0.1)',
                }}
              >
                Finish
              </button>
            </div>
            {devRows.map((devRows, index) => (
        <div
          key={devRows}
          className="row"
          style={{
            marginBottom: '13px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <input
            className="team-input"
            onChange={(e) => handleTeamSelect(index, e.target.value)}
            value={devScoredTeams[index]?.[0] || ""}
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
          />
          <select
            className="defense-select"
            onChange={(e) => handleDefenseSelect(index, e.target.value)}
            value={devScoredTeams[index]?.[1] || ""}
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
      </div>
    </div>
  );
};

export default DevPage;