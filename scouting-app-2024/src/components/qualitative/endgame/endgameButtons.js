import React from 'react';

const EndgameButtons = () => {
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
          <button style={{ 
            flexShrink: 0,
            width:'48%',
            height:'40px',
            backgroundColor: '#000614',
            border: '1px solid #2F3953',
            borderRadius: '10px',
            color: 'rgba(255, 255, 255, 0.50)',
            fontFamily: 'Poppins',
            background: 'rgba(217, 217, 217, 0.00)',
            fontSize: '20px',
            fontStyle: 'normal',
            lineHeight: 'normal',
            boxShadow: '2px 0px 22px 1px rgba(255, 255, 255, 0.1)',
            fontWeight:'700',
            
            }}>Harmonize</button>
          <button style ={{
            flexShrink: 0,
            width:'48%',
            //padding: '8px',
            height:'40px',
            backgroundColor: '#000614',
            border: '1px solid #2F3953',
            borderRadius: '10px',
            color: 'rgba(255, 255, 255, 0.50)',
            fontFamily: 'Poppins',
            background: 'rgba(217, 217, 217, 0.00)',
            fontSize: '20px',
            fontStyle: 'normal',
            lineHeight: 'normal',
            boxShadow: '2px 0px 22px 1px rgba(255, 255, 255, 0.1)',
            fontWeight:'700'
        }} >Climb</button>
        </div>
      </div>
    </div>
  );
};

export default EndgameButtons;
