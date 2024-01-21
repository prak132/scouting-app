import React, { useState } from 'react';

const QualitativeTable = () => {
  const [rows, setRows] = useState(Array.from({ length: 5 }, (_, index) => index + 1));

  const addRow = () => {
    setRows([rows.length + 1, ...rows]);
  };

  return (
    <div>
      <div
        className="scrollable-container"
        style={{
          height: '272px',
          backgroundColor: '#000614',
          overflowY: 'auto',
          padding: '13px',
        }}
      >
        {rows.map((row) => (
          <div key={row} className="row" style={{ marginBottom: '13px' }}>
            <select
              className="team-select"
              style={{
                width: '100px',
                height: '44px',
                flexShrink: '0',
                padding: '8px',
                backgroundColor: '#000614',
                border: '1px solid #2F3953',
                borderRadius: '10px',
                color: 'rgba(255, 255, 255, 0.25)',
                fontFamily: 'Poppins',
                background: 'rgba(217, 217, 217, 0.00)',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '600',
                lineHeight: 'normal',
                boxShadow: '0px 0px 20px 1px rgba(255, 255, 255, 0.1)',
              }}
            >
              <option value="team1">Team 1</option>
              <option value="team2">Team 2</option>
              <option value="team3">Team 3</option>
            </select>
            <select
              className="defense-select"
              style={{
                width: '60%',
                marginLeft: '12px',
                height: '44px',
                padding: '8px',
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
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        ))}
      </div>
      <div>
        <button
          className="addRowBtn"
          onClick={addRow}
          style={{
            position: 'absolute',
            top: '70%',
            right: '99px',
            padding: '10px',
            backgroundColor: '#A1A3A8',
            color: 'white',
            fontFamily: 'poppins',
            fontSize: '20px',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            width: '56px',
            height: '56px',
            flexShrink: '0',
            strokeWidth: '2px',
            stroke: '#2F343F',
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QualitativeTable;
