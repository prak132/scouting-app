import React from 'react';

const PageButtons = ({ onLeftButtonClick, onRightButtonClick }) => {
  

  return (
    <div>
      <div style={{ marginTop: '120px' }}></div>

       (
        <div
          style={{
            position: 'fixed',
            bottom: '10px',
            left: '100px',
            right: '100px',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: '100%',
              minWidth: '430px',
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
                height: '1px',
                backgroundColor: '#313B54',
              }}
            ></div>

            <button
              onClick={onLeftButtonClick}
              style={{
                color: '#FFF',
                fontFamily: 'Poppins',
                fontSize: '4vw',
                backgroundColor: 'transparent',
                border: 'none',
              }}
            >
              {'<'}
            </button>
            <button
              onClick={onRightButtonClick}
              style={{
                color: '#FFF',
                fontFamily: 'Poppins',
                fontSize: '4vw',
                backgroundColor: 'transparent',
                border: 'none',
              }}
            >
              {'>'}
            </button>
          </div>
        </div>
      )
    </div>
  );
};

export default PageButtons;
