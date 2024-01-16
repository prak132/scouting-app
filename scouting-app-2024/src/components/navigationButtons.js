import React from 'react';

const PageButtons = ({ onLeftButtonClick, onRightButtonClick }) => {
    return (
    <div>
    <div type="leftButton" style={{ display: "flex", justifyContent: "flex-start", alignItems: "right", marginBottom: "2vh", marginTop: "2vh", width: '18px', height: '31px', color: '#000614', backgroundColor:'#000614'}}>
          <button onClick={onLeftButtonClick} style={{color: '#FFF', fontFamily: 'Poppins', fontSize: '24px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', backgroundColor: '#000614', border: 'none', width:"430px", width: '100%', gap: 291, display: 'inline-flex' }}>
              {'<'}
          </button>
      </div>
      <div type="rightButton" style={{ display: "flex", justifyContent: "flex-start", alignItems: "left", marginBottom: "2vh", marginTop: "2vh", width: '18px', height: '31px', color: '#000614', backgroundColor:'#000614', }}>
              <button onClick={onRightButtonClick} style={{color: '#FFF', fontFamily: 'Poppins', fontSize: '24px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', backgroundColor: '#000614', border: 'none', marginTop: '-90px', marginLeft: '1207px', paddingBottom:'20000px'}}>
                   {'>'}
              </button>
        </div>
    </div>
  );
};

export default PageButtons;