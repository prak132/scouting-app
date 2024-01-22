import React from 'react';

const PageButtons = ({ onLeftButtonClick, onRightButtonClick }) => {
  return (
    <div
      style={{
        position: 'fixed', 
        bottom: 0,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        width: '86%',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          minWidth: '100%',
          margin: '2vh',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: '#313B54',
          }}
        ></div>

        <button
          onClick={onLeftButtonClick}
          style={{
            color: '#FFF',
            fontFamily: 'Poppins',
            fontSize: '6vw',
            backgroundColor: 'transparent',
            border: 'none',
            margin: 10,
          }}
        >
          {'<'}
        </button>
        <button
          onClick={onRightButtonClick}
          style={{
            color: '#FFF',
            fontFamily: 'Poppins',
            fontSize: '6vw',
            backgroundColor: 'transparent',
            border: 'none',
            margin: 10,
          }}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default PageButtons;
