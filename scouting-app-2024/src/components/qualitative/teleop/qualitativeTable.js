import React, { useState } from 'react';

const QualitativeTable = () => {
  const [rows, setRows] = useState(Array.from({ length: 5 }, (_, index) => index + 1));

  const addRow = () => {
    setRows([...rows, rows.length + 1]);
  };

  return (
    <div className="container" style={{ backgroundColor: '#000614', padding: '13px' }}>
      {rows.map((row) => (
        <div key={row} className="row" style={{ marginBottom: '13px' }}>
          <input
            type="text"
            className="textbox"
            placeholder="Team #"
            style={{
              marginRight: '12px',
              padding: '8px',
              backgroundColor: '#000614',
              border: '1px solid #2F3953',
              borderRadius: '4px',
              color: 'rgba(255, 255, 255, 0.25)',
              fontFamily: 'Poppins',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '600',
              lineHeight: 'normal' 
            }}
          />
          <select
            className="scroll-menu"
            style={{
              padding: '8px',
              fontFamily: 'poppins',
              fontSize: '16px',
              color: 'white',
              backgroundColor: '#000614',
              border: '1px solid #ccc',
              borderRadius: '4px',
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
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          fontFamily: 'poppins',
          fontSize: '16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        +
      </button>
    </div>
  );
};

export default QualitativeTable;
