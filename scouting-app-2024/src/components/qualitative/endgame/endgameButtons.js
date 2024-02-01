import React, { useState } from 'react';

const EndgameButtons = () => {
  const [buttonStates, setButtonStates] = useState({ harmonize: false, climb: false });

  const handleButtonClick = (buttonName) => {
    setButtonStates((prevButtonStates) => ({
      ...Object.fromEntries(Object.entries(prevButtonStates).map(([name]) => [name, name === buttonName])),
    }));
  };

  return (
    <div style={{ position: 'relative' }}>
      
      <div
        style={{
          width: '100%',
          left: '0',
          position: 'absolute',
          height: '3px',
          background: '#313B54',
          display: 'relative',
        }}
      ></div>

      
      <div
        style={{
          width: '100%',
          height: '24rem',
          textAlign: 'center',
          backgroundColor: '#00000000',
          paddingTop: '18px',
          boxSizing: 'border-box',
        }}
      >
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          
          <button
            style={{
              width: '48%',
              height: '40px',
              backgroundColor: 'rgba(217, 217, 217, 0.00)',
              border: buttonStates.harmonize ? '2px solid white' : '1px solid #2F3953', // White border when clicked
              borderRadius: '10px',
              color: buttonStates.harmonize ? 'white' : '#7d7d7d', // Gray text color
              fontFamily: 'Poppins',
              fontSize: '20px',
              fontStyle: 'normal',
              lineHeight: 'normal',
              boxShadow: buttonStates.harmonize ? '2px 0px 22px 1px rgba(255, 255, 255, 0.1)' : 'none', // No shadow when not clicked
              fontWeight: '700',
            }}
            onClick={() => handleButtonClick('harmonize')}
          >
            Harmonize
          </button>

          
          <button
            style={{
              width: '48%',
              height: '40px',
              backgroundColor: 'rgba(217, 217, 217, 0.00)',
              border: buttonStates.climb ? '2px solid white' : '1px solid #2F3953', // White border when clicked
              borderRadius: '10px',
              color: buttonStates.climb ? 'white' : '#7d7d7d', // Gray text color
              fontFamily: 'Poppins',
              fontSize: '20px',
              fontStyle: 'normal',
              lineHeight: 'normal',
              boxShadow: buttonStates.climb ? '2px 0px 22px 1px rgba(255, 255, 255, 0.1)' : 'none', // No shadow when not clicked
              fontWeight: '700',
            }}
            onClick={() => handleButtonClick('climb')}
          >
            Climb
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndgameButtons;
