import React from "react";
import RedoMark from "./assets/redo.svg";
import ExclamationMark from "./assets/exclamation.svg";

const UndoInfo = ({ onClick }) => {
  return (
    <div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', gap: 291, display: 'inline-flex' }}>
      <button onClick={onClick} style={{ border: 'none', background: 'none', padding: 0, margin: 0 }}>
        <div style={{ justifyContent: 'center', alignItems: 'center', gap: 12, display: 'flex' }}>
          <div style={{ width: 36, height: 36, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px rgba(255, 255, 255, 0.70) solid', overflow: 'hidden' }}>
              <img src={RedoMark} alt="Redo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </button>
      <button onClick={onClick} style={{ border: 'none', background: 'none', padding: 0, margin: 0 }}>
        <div style={{ width: 36, height: 36, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px rgba(255, 255, 255, 0.70) solid', overflow: 'hidden' }}>
            <img src={ExclamationMark} alt="Exclamation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </button>
    </div>
  );
};

export default UndoInfo;
