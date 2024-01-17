import React from 'react';

const PageButtons = ({ onLeftButtonClick, onRightButtonClick }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed', bottom: '0', left: '0', right: '0', backgroundColor: 'transparent', marginTop: '40px' }}>
     <div style={{ width: '430px', height: '53px', backgroundColor: 'transparent', margin: '2vh' }}>
       <button onClick={onLeftButtonClick} style={{ position: 'absolute', left: '20px', top: '50%', color: '#FFF', fontFamily: 'Poppins', fontSize: '24px', backgroundColor: 'transparent', border: 'none' }}>
         {'<'}
       </button>
       <button onClick={onRightButtonClick} style={{ position: 'absolute', right: '20px', top: '50%', color: '#FFF', fontFamily: 'Poppins', fontSize: '24px', backgroundColor: 'transparent', border: 'none' }}>
         {'>'}
       </button>
     </div>
   </div>
  );
};

export default PageButtons;