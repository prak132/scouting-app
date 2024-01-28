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

  return (
    <div style={{marginTop:'-300px'}}>
      <div style={{ border: '2px solid #3B72FF', width: '400px', height: '70px', boxSizing: 'border-box',display: 'flex',justifyContent: 'space-between',alignItems: 'center', padding: '0 20px', marginBottom: '25px' }}>
        <button style={{ 
          padding: '10px', 
          fontSize: '16px', 
          backgroundColor: buttonColors[0],
          borderRadius: '10px',
          border: '1px solid #2F3953',
          background: '#010715',
          boxShadow: '0px 0px 30px 5px rgba(255, 255, 255, 0.30)',
          width: '100px', 
          height: '55px',
          flexShrink: '0',
          color: 'rgba(255, 255, 255, 0.50)',
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: 'normal',
        }} onClick={() => handleButtonClick(0)}>1678</button>

        <button style={{ 
          padding: '10px', 
          fontSize: '16px', 
          backgroundColor: buttonColors[1],
          borderRadius: '10px',
          border: '1px solid #2F3953',
          background: '#010715',
          boxShadow: '0px 0px 30px 5px rgba(255, 255, 255, 0.30)',
          width: '100px', 
          height: '55px',
          flexShrink: '0',
          color: 'rgba(255, 255, 255, 0.50)',
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: 'normal',
        }} onClick={() => handleButtonClick(1)}>846</button>

        <button style={{ 
          padding: '10px', 
          fontSize: '16px', 
          backgroundColor: buttonColors[2],
          borderRadius: '10px',
          border: '1px solid #2F3953',
          background: '#010715',
          boxShadow: '0px 0px 30px 5px rgba(255, 255, 255, 0.30)',
          width: '100px', 
          height: '55px',
          flexShrink: '0',
          color: 'rgba(255, 255, 255, 0.50)',
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: 'normal',
        }} onClick={() => handleButtonClick(2)}>254</button>
      </div>

      <div style={{ border: '2px solid #FF3B3B', width: '400px', height: '70px', boxSizing: 'border-box',display: 'flex',justifyContent: 'space-between',alignItems: 'center', padding: '0 20px' }}>
        <button style={{ 
          padding: '10px', 
          fontSize: '16px', 
          backgroundColor: buttonColors[3],
          borderRadius: '10px',
          border: '1px solid #2F3953',
          background: '#010715',
          boxShadow: '0px 0px 30px 5px rgba(255, 255, 255, 0.30)',
          width: '100px', 
          height: '55px',
          flexShrink: '0',
          color: 'rgba(255, 255, 255, 0.50)',
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: 'normal',
        }} onClick={() => handleButtonClick(3)}>1678</button>

        <button style={{ 
          padding: '10px', 
          fontSize: '16px', 
          backgroundColor: buttonColors[4],
          borderRadius: '10px',
          border: '1px solid #2F3953',
          background: '#010715',
          boxShadow: '0px 0px 30px 5px rgba(255, 255, 255, 0.30)',
          width: '100px', 
          height: '55px',
          flexShrink: '0',
          color: 'rgba(255, 255, 255, 0.50)',
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: 'normal',
        }} onClick={() => handleButtonClick(4)}>846</button>

        <button style={{ 
          padding: '10px', 
          fontSize: '16px', 
          backgroundColor: buttonColors[5],
          borderRadius: '10px',
          border: '1px solid #2F3953',
          background: '#010715',
          boxShadow: '0px 0px 30px 5px rgba(255, 255, 255, 0.30)',
          width: '100px', 
          height: '55px',
          flexShrink: '0',
          color: 'rgba(255, 255, 255, 0.50)',
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: 'normal',
        }} onClick={() => handleButtonClick(5)}>254</button>
      </div>
    </div>
  );
};

export default RectangleWithButtons;
