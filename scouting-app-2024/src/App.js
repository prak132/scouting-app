import './App.css';
import React, { useState } from 'react';
import StartLayout from './components/start/layout.js';
import AutoLayout from './components/auto/layout.js';
import TeleopLayout from './components/teleop/layout.js';
import PageButtons from './components/navigationButtons.js';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const pages = [StartLayout, TeleopLayout, AutoLayout];
  const handleLeftButtonClick = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : pages.length - 1));
  };
  const handleRightButtonClick = () => {
    setCurrentPage((prevPage) => (prevPage < pages.length - 1 ? prevPage + 1 : 0));
  };
  const choosePage = (elapsedTime) => {
    const PageComponent = pages[currentPage];
    if (elapsedTime === 0) {
      return <StartLayout key={currentPage} />;
    } else if (elapsedTime < 1500 && elapsedTime > 0) {
      return <TeleopLayout key={currentPage} />;
    } else if (elapsedTime > 15000) {
      return <AutoLayout key={currentPage} />;
    } else {
      return <PageComponent key={currentPage} />;
    }
  };
  
  const elapsedTime = 3000;
  
  return (
    <div>
      {choosePage(elapsedTime)}
      <PageButtons onLeftButtonClick={handleLeftButtonClick} onRightButtonClick={handleRightButtonClick} />
    </div>
  );
}

export default App;
