import './App.css';
import React from 'react';
import AutoLayout from './components/auto/layout.js';
import TeleopLayout from './components/teleop/layout.js';

function App() {
  const choosePage = (elapsedTime) => {
    if (elapsedTime < 1500) {
      return <TeleopLayout />;
    } else if (elapsedTime > 15000) {
      return <AutoLayout />;
    } else {
      return <TeleopLayout />;
    }
  };
  const elapsedTime = 1501;
  return (
    <div>
      {choosePage(elapsedTime)}
    </div>
  );
}

export default App;
