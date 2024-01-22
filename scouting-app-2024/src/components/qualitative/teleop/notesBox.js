import React from 'react';

const RectangleWithText = () => {
  return (
    <div style={{ display: 'left', justifyContent: 'flex-end' }}>
      <div
        style={{
          width: '100%',
          height: 'auto',
          textAlign: 'center',
          backgroundColor: '#00000000',
          padding: '20px',
          boxSizing: 'border-box',
          borderTop: '4px solid #2F3953',
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
        <textarea
          style={{
            width: '100%',
            height: '10rem',
            boxSizing: 'border-box',
            marginTop: '10px',
            backgroundColor: '#000614',
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal',
            border: '1px solid #2F3953',
            color: '#FFFFFF4D',
            textAlign: 'left',
            verticalAlign: 'top',
            boxShadow: '0px 0px 51px 5px rgba(255, 255, 255, 0.25)',
            overflow: 'auto',  
            resize: 'none',  
            padding: '10px',
            borderRadius: '10px',
          }}
          placeholder="Describe driver abilities. Make sure to add team number as well"
        />
      </div>
    </div>
  );
};

export default RectangleWithText;
