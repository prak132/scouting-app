import React from "react";
import Check from "./assets/check.svg";

const Scored = ({ placed, teamnum }) => {
  return (
    <div>
      {placed && (
        <div style={{
          width: '40vh',
          height: '5vh',
          background: '#1E232E',
          boxshadow: "0px 0px 42.3px 2px rgba(185, 255, 230, 0.10) inset, 0px 0px 42.3px 5px rgba(185, 255, 230, 0.25)",
          borderRadius: 10,
          border: '1px solid #B9FFE6',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ width: '100%', gap: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '6vh', height: '6vh', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: 20, height: 20, position: 'absolute' }}>
                <img src={Check} alt="Check" style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
            <div style={{ color: '#B9FFE6', fontSize: 18, fontWeight: '600', wordWrap: 'break-word' }}>{teamnum} Scored {placed}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scored;
