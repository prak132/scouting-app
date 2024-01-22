import React from 'react';

const PageButtons = ({ onLeftButtonClick, onRightButtonClick }) => {
  return (
    <div
      style={{
        position: 'fixed', 
        left: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        width: '100%',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          minWidth: '100%',
          display: 'flex',
          padding: '1.5vh',
          justifyContent: 'space-between',
          position: 'relative',
          background: '#000614',
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
            marginLeft: 20,
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
            marginRight: 20,
          }}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default PageButtons;
