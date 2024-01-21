import React from 'react';

const RectangleWithText = () => {
  return (
    <div style={{ display: 'left', justifyContent: 'flex-end' }}>
      <div
        style={{
          width: '364px',
          height: 'auto',
          textAlign: 'center',
          backgroundColor: '#00000000',
          padding: '20px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <h2
          style={{
            margin: '0',
            fontFamily: 'Poppins',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal',
            color: 'transparent',
            background: 'linear-gradient(181deg, #FFF 1.05%, rgba(255, 255, 255, 0.00) 126.16%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          Notes
        </h2>
        <input
          type="text"
          style={{
            width: '364px',
            height: '198px',
            boxSizing: 'border-box',
            marginTop: '10px',
            backgroundColor: '#000614',
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal',
            border: 'none',
            color: '#FFFFFF4D',
            textAlign: 'left',
            verticalAlign: 'top',
            boxShadow: '0px 0px 51px 5px rgba(255, 255, 255, 0.25)'
          }}
          placeholder="Describe driver abilities. Make sure to add team number as well"
        />
      </div>
    </div>
  );
};

export default RectangleWithText;
