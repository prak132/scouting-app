import React, { useState } from 'react';

const EndgameButtons = ({ onEndgameButtonClick, teamsClimbed, qualEndactions, selAlliance}) => {
  const [buttonStates, setButtonStates] = useState({ harmonized: false, climbed: false });

  const handleButtonClick = (buttonName) => {
    onEndgameButtonClick(buttonName);
    setButtonStates({ harmonized: false, climbed: false });
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
          height: '5rem',
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
              border: buttonStates.harmonized ? '2px solid white' : '1px solid #2F3953',
              borderRadius: '10px',
              color: buttonStates.harmonized ? 'white' : '#7d7d7d',
              fontFamily: 'Poppins',
              fontSize: '20px',
              fontStyle: 'normal',
              lineHeight: 'normal',
              boxShadow: buttonStates.harmonized ? '2px 0px 22px 1px rgba(255, 255, 255, 0.1)' : 'none',
              fontWeight: '700',
            }}
            onClick={() => handleButtonClick('harmonized')}
            disabled={
              buttonStates.harmonized ||
              (qualEndactions?.harmonized &&
                qualEndactions.harmonized[selAlliance === '0' ? 'blue' : 'red'] &&
                teamsClimbed.some((team) =>
                  qualEndactions.harmonized[selAlliance === '0' ? 'blue' : 'red'].some(
                    (selectedTeam) => selectedTeam[0] === team
                  )
                ))
            }
          >
            Harmonize
          </button>

          
          <button
            style={{
              width: '48%',
              height: '40px',
              backgroundColor: 'rgba(217, 217, 217, 0.00)',
              border: buttonStates.climbed ? '2px solid white' : '1px solid #2F3953',
              borderRadius: '10px',
              color: buttonStates.climbed ? 'white' : '#7d7d7d',
              fontFamily: 'Poppins',
              fontSize: '20px',
              fontStyle: 'normal',
              lineHeight: 'normal',
              boxShadow: buttonStates.climbed ? '2px 0px 22px 1px rgba(255, 255, 255, 0.1)' : 'none',
              fontWeight: '700',
            }}
            onClick={() => handleButtonClick('climbed')}
          >
            Climb
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndgameButtons;