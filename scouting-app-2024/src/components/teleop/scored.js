import React from "react";
import Check from "./assets/check.svg";

const Scored = ({ placed, teamnum }) => {
  return (
    <div style={{
      width: '25%',
      height: '100%',
      background: '#1E232E',
      boxShadow: '0px 0px 42.29999923706055px 2px rgba(185.33, 255, 229.92, 0.10) inset',
      borderRadius: 10,
      border: '1px #B9FFE6 solid',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div style={{ width: '100%', gap: 23, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 30, height: 30, position: 'relative' }}>
          <div style={{ width: 25, height: 25, left: 2.50, top: 2.50, position: 'absolute'}}>
            <img src={Check} alt="Check" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        <div style={{ color: '#B9FFE6', fontSize: 22, fontWeight: '600', wordWrap: 'break-word' }}>{teamnum} Scored Speaker</div>
      </div>
    </div>
  );
};

export default Scored;
