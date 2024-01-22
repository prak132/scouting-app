import React, { useState } from 'react';

const QualitativeTable = () => {
  const [rows, setRows] = useState(Array.from({ length: 5 }, (_, index) => index + 1));

  const addRow = () => {
    setRows([rows.length + 1, ...rows]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', height: '300px' }}>
      <div
        className="scrollable-container"
        style={{
          height: '100%', 
          maxHeight: '300px',
          backgroundColor: '#000614',
          overflowY: 'scroll',
          padding: '13px',
        }}
      >
        {rows.map((row) => (
          <div key={row} className="row" style={{
            marginBottom: '13px',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <select
              className="team-select"
              style={{
                width: '100px',
                height: '44px',
                flexShrink: 0,
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
                boxShadow: '2px 0px 22px 1px rgba(255, 255, 255, 0.1)',
              }}
            >
              <option value="team1">Team 1</option>
              <option value="team2">Team 2</option>
              <option value="team3">Team 3</option>
            </select>
            <select
              className="defense-select"
              style={{
                marginLeft: '10px',
                flex: 1,
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
      <button
  className="addRowBtn"
  onClick={addRow}
  style={{
    position: 'absolute',
    right: '-10px',
    bottom: '-20px',
    padding: '10px',
    backgroundColor: '#A1A3A8',
    color: 'white',
    fontFamily: 'poppins',
    fontSize: '20px',
    background: '#A1A3A8',
    borderRadius: '50%',
    border: '5px solid #2F343F',
    cursor: 'pointer',
    width: '50px',
    height: '50px',
    boxShadow: '0px 0px 35px 3px rgba(255, 255, 255, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Center vertically
    margin: 'auto', // Center horizontally
  }}
>
  <div style={{ color: '#2F343F', fontWeight: 'bolder', fontSize: '20px' }}>+</div>
</button>

    </div>
  );
};

export default QualitativeTable;
