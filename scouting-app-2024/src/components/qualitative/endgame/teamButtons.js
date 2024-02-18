import React from 'react';

const TeamButtons = ({ teamButtonState, setTeamButtonState, blueTeamNumbers, redTeamNumbers }) => {
  const { blue: blueButtonStates, red: redButtonStates } = teamButtonState;
  const handleBlueButtonClick = (index) => {
    const newButtonStates = [...blueButtonStates];
    newButtonStates[index] = !newButtonStates[index];
    setTeamButtonState(prevState => ({ ...prevState, blue: newButtonStates }));
  };

  const handleRedButtonClick = (index) => {
    const newButtonStates = [...redButtonStates];
    newButtonStates[index] = !newButtonStates[index];
    setTeamButtonState(prevState => ({ ...prevState, red: newButtonStates }));
  };

  const renderButtons = (teamNumbers, buttonStates, handleClick, borderColor) => {
    return (
      <div> 
        <div style={{ border: `2px solid ${borderColor}`, borderRadius: '10px', padding: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          {teamNumbers.map((number, index) => (
            <button
              key={index}
              style={{
                backgroundColor: '#000614',
                color: buttonStates[index] ? 'white' : '#7d7d7d',
                borderRadius: '10px',
                border: buttonStates[index] ? '1px solid white' : '2px solid #2F3953', 
                width: '32%',
                height: '50px',
                margin: '5px',
                fontSize: '20px',
                fontWeight: '700',
                boxShadow: buttonStates[index] ? '0px 0px 15px 1px rgba(255, 255, 255, 0.30)' : '0px 0px 30px 1px rgba(255, 255, 255, 0.30)',
              }}
              onClick={() => handleClick(index)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        {renderButtons(blueTeamNumbers, blueButtonStates, handleBlueButtonClick, 'blue', '#3B72FF')}
        {renderButtons(redTeamNumbers, redButtonStates, handleRedButtonClick, 'red', '#FF3B3B')}
      </div>
    </div>
  );
};

export default TeamButtons;
