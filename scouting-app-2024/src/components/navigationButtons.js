import React from 'react';

const PageButtons = ({ onLeftButtonClick, onRightButtonClick }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      position: 'fixed',
      bottom: '0',
      left: '0',
      right: '0',
      backgroundColor: 'transparent',
      height: '100vh', // Adjusted to take full height
    }}>
      <div style={{
        width: '90%',
        height: '5%',
        backgroundColor: 'transparent',
        margin: '2vh',
        maxWidth: '430px',
        display: 'flex',
        justifyContent: 'space-between', // Equal distance between buttons
        position: 'relative',
      }}>
        
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px', 
          backgroundColor: '#313B54', 
        }}></div>
    
        
        <button onClick={onLeftButtonClick} style={{
          color: '#FFF',
          fontFamily: 'Poppins',
          fontSize: '4vw',
          backgroundColor: 'transparent',
          border: 'none',
        }}>
          {'<'}
        </button>
        <button onClick={onRightButtonClick} style={{
          color: '#FFF',
          fontFamily: 'Poppins',
          fontSize: '4vw',
          backgroundColor: 'transparent',
          border: 'none',
        }}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default PageButtons;