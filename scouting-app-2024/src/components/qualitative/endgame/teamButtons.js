import React, { useState } from 'react';
import Cookies from 'js-cookie';

const RectangleWithButtons = () => {
  const [buttonColors, setButtonColors] = useState(Array(6).fill('white'));
  const blueTeamNumbers = JSON.parse(Cookies.get("blueTeamNumbers")) || [];
  const redTeamNumbers = JSON.parse(Cookies.get("redTeamNumbers")) || [];

  const handleButtonClick = (index) => {
    const newColors = [...buttonColors];
    newColors[index] = 'blue';
    setButtonColors(newColors);

    setTimeout(() => {
      newColors[index] = 'white';
      setButtonColors(newColors);
    }, 1000);
  };

  const renderButtons = (teamNumbers, teamColor) => {
    return teamNumbers.map((number, index) => (
      <button
        key={index}
        style={{
          padding: '10px',
          fontSize: '20px',
          backgroundColor: buttonColors[index],
          borderRadius: '10px',
          border: '1px solid #2F3953',
          background: 'rgba(217, 217, 217, 0.00)',
          boxShadow: '0px 0px 15px 1px rgba(255, 255, 255, 0.30)',
          width: '100px',
          height: '55px',
          flexShrink: '0',
          color: 'rgba(255, 255, 255, 0.50)',
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: 'normal',
        }}
        onClick={() => handleButtonClick(index)}
      >
        {number}
      </button>
    ));
  };

  return (
    <div style={{ marginTop: '-300px' }}>
      <div style={{ border: '2px solid #3B72FF', borderRadius: '10px', width: '350px', height: '70px', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', marginBottom: '25px' }}>
        {renderButtons(blueTeamNumbers, 'blue')}
      </div>

      <div style={{ border: '2px solid #FF3B3B', borderRadius: '10px', width: '350px', height: '70px', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', }}>
        {renderButtons(redTeamNumbers, 'red')}
      </div>
    </div>
  );
};

export default RectangleWithButtons;