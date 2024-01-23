import React, { useState } from 'react';

const QualitativeTable = () => {
  const [rows, setRows] = useState(Array.from({ length: 3 }, (_, index) => index + 1));

  const addRow = () => {
    setRows([rows.length + 1, ...rows]);
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
         <div style={{
            marginBottom: '13px',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
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
              Defense Location
            </div>
            <button
              className='add-button'
              onClick={addRow}
              style={{
                flex: 0.1,
                marginLeft: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '25px',
                background: 'rgba(217, 217, 217, 0.00)',
                border: '1px solid #2F3953',
                borderRadius: '10px',
                boxShadow: '0px 0px 35px 1px rgba(255, 255, 255, 0.1)',
              }}
              >+</button>
          </div>
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
              <option value="team1">846</option>
              <option value="team2">254</option>
              <option value="team3">1678</option>
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
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '16px',
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
              <option value="option1">Source</option>
              <option value="option2">Center</option>
            </select>
            <button
              className='delete-button'
              style={{
                flex: 0.1,
                marginLeft: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '30px',
                background: 'rgba(217, 217, 217, 0.00)',
                border: '1px solid #2F3953',
                borderRadius: '10px',
                boxShadow: '0px 0px 35px 1px rgba(255, 255, 255, 0.1)',
              }}
              >-</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QualitativeTable;
