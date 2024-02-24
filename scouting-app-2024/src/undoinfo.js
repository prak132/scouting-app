import React from "react";
import ExclamationMark from "./assets/exclamation.svg";

const UndoDev = ({ onUndoClick, onInfoClick }) => {
  return (
    <div style={{
      width: '100%',
      height: '100%', 
      display: 'inline-flex', 
      marginTop: 20 
    }}>
      <button onClick={onUndoClick} style={{
         border: 'none',
         background: 'none', 
         padding: 0, 
         margin: 0 }}>
        <div style={{ justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex' }}>
          <div style={{ width: 80, height: 36, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: 80, height: 36, borderRadius: '10%', border: '1px rgba(255, 255, 255, 0.70) solid', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{color: "white", fontSize: "18px"}}>
                UNDO
              </div>
            </div>
          </div>
        </div>
       </button>
      <button onClick={onInfoClick} style={{ border: 'none', background: 'none', padding: 0, margin: 0, marginLeft: 'auto' }}>
        <div style={{ width: 36, height: 36, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px rgba(255, 255, 255, 0.70) solid', overflow: 'hidden' }}>
            <img src={ExclamationMark} alt="Exclamation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </button>
    </div>
  );
};

export default UndoDev;
