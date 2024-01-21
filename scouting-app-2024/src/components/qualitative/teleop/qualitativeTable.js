import React, { useState } from 'react';

const QualitativeTable = () => {
  const [rows, setRows] = useState(Array.from({ length: 5 }, (_, index) => index + 1));

  const addRow = () => {
    setRows([...rows, rows.length + 1]);
  };

  return (
    <div
      className="scrollable-container"
      style={{
        height: '272px',
        overflowY: 'auto',
        backgroundColor: '#000614',
        padding: '13px',
      }}
    >
      {rows.map((row) => (
        <div key={row} className="row" style={{ marginBottom: '13px' }}>
          <select
            className="team-select"
            style={{
              width: '100px',
              marginRight: '12px',
              padding: '8px',
              backgroundColor: '#000614',
              border: '1px solid #2F3953',
              borderRadius: '10px',
              color: 'rgba(255, 255, 255, 0.25)',
              fontFamily: 'Poppins',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 'normal',
              boxShadow: '0px 0px 51px 5px rgba(255, 255, 255, 0.25)'
            }}
          >
            <option value="team1">Team 1</option>
            <option value="team2">Team 2</option>
            <option value="team3">Team 3</option>
          </select>
          <select
            className="defense-select"
            style={{
              width: '140px',
              padding: '8px',
              fontFamily: 'poppins',
              fontSize: '16px',
              color: '#FFFFFF40',
              backgroundColor: '#000614',
              border: '1px solid #2F3953',
              borderRadius: '4px',
              boxShadow: '0px 0px 51px 5px rgba(255, 255, 255, 0.25)'
            }}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      ))}

      <button
        className="addRowBtn"
        onClick={addRow}
        style={{
          marginTop: '13px',
          marginLeft:'287px',
          padding: '10px',
          backgroundColor: '#A1A3A8',
          color: 'white',
          fontFamily: 'poppins',
          fontSize: '32px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          width: '66px',
          height: '66px',
          flexShrink: '0',
          strokeWidth: '2px',
          stroke: '#2F343F',
          
        }}
      >
        +
      </button>
    </div>
  );
};

export default QualitativeTable;
