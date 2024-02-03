import React, { useState } from 'react';

const PageButtons = ({ onLeftButtonClick, onRightButtonClick, setDevMode }) => {
  const [devModeKey, setDevModeKey] = useState('');
  const fhash = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
      h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };
  
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setDevModeKey(inputValue);
    if (fhash(inputValue) === 7067371117425878) {
      console.log("dev mode enabled");
      setDevMode(true);
    } else {
      setDevMode(false);
    }
  };


  return (
    <div
      style={{
        position: 'fixed', 
        left: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        width: '100%',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          minWidth: '100%',
          display: 'flex',
          padding: '1.5vh',
          justifyContent: 'space-between',
          position: 'relative',
          background: '#000614',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            backgroundColor: '#313B54',
          }}
        ></div>
        <button
          onClick={onLeftButtonClick}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            width: '40px',
            margin: 10,
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{position: 'relative', width: '18px' }}><path fill="#ffffff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>        </button>
          <input
          placeholder="DevMode Key"
          value={devModeKey}
          id = "devKeyInput"
          onChange={handleInputChange}
          style={{
            margin: 10,
            padding: '5px',
            border: '2px solid #313B54',
            borderRadius: '4px',
            color: '#fff',
            backgroundColor: 'transparent',
          }}
        />
        <button
          onClick={onRightButtonClick}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            width: '40px',
            margin: 10,
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{position: 'relative', width: '18px'}}><path fill="#ffffff" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
        </button>
      </div>
    </div>
  );
};

export default PageButtons;
