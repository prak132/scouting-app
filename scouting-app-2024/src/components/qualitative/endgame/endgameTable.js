import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const EndgameTable = () => {
  const [rows, setRows] = useState(Array.from({ length: 3 }, (_, index) => index + 1));
  const [teamOptions, setTeamOptions] = useState([]);

  useEffect(() => {
    const selAlliance = Cookies.get("selAlliance");
    const teamNumbers = selAlliance === "0" ? JSON.parse(Cookies.get("blueTeamNumbers")) || [] : selAlliance === "1" ? JSON.parse(Cookies.get("redTeamNumbers")) || [] : [];
    const options = teamNumbers.map((team) => (
      <option key={team} value={`team${team}`}>
        {team}
      </option>
    ));
    setTeamOptions(options);
  }, []);

  const addRow = () => {
    setRows([rows.length + 1, ...rows]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
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
          <select
            className="team-select glowing-dropdown-input"
            style={{
              flex: 0.4,
              flexShrink: 0,
              padding: '8px',
              marginLeft: '10px',
            }}
          >
            {teamOptions}
          </select>
          <select
            className="defense-select glowing-dropdown-input"
            style={{
              marginLeft: '10px',
              flex: 1,
              padding: '8px',
              fontFamily: 'poppins',
            }}
          >
            <option value="option1">Source</option>
            <option value="option2">Center</option>
          </select>
          <button
            className="add-button Next glow"
            onClick={addRow}
            style={{
              flex: 0.1,
              marginLeft: '10px',
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
              className="team-select glowing-dropdown-input"
              style={{
                width: '100px',
                flex: 0.4,
                flexShrink: 0,
                padding: '8px',
                marginLeft: '10px',
              }}
            >
              {teamOptions}
            </select>
            <select
              className="defense-select glowing-dropdown-input"
              style={{
                marginLeft: '10px',
                flex: 1,
                height: '44px',
                padding: '8px',
                fontFamily: 'poppins',
              }}
            >
              <option value="option1">Source</option>
              <option value="option2">Center</option>
            </select>
            <button
              className="delete-button Next glow"
              onClick={() => removeRow(index)}
              style={{
                flex: 0.1,
                marginLeft: '10px',
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

export default EndgameTable;