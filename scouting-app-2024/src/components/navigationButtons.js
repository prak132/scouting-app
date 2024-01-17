import React from 'react';

const PageButtons = ({ onLeftButtonClick, onRightButtonClick }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', left: '50%', bottom: '0', marginBottom: '2vh' }}>
      <div style={{ width: '430px', height: '53px', backgroundColor: '#000614', margin: '2vh' }}>
        <button onClick={onLeftButtonClick} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#FFF', fontFamily: 'Poppins', fontSize: '24px', backgroundColor: '#000614', border: 'none' }}>
          {'<'}
        </button>
        <button onClick={onRightButtonClick} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', color: '#FFF', fontFamily: 'Poppins', fontSize: '24px', backgroundColor: '#000614', border: 'none' }}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default PageButtons;



