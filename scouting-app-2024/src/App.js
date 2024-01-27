import React, { useState } from 'react';
import "./App.css";
import AutoLayout from "./components/auto/layout.js";
import QuantTeleopLayout from "./components/quantitative/teleop/layout.js";
import QuantEndGameLayout from "./components/quantitative/endgame/layout.js";
import QualTeleopLayout from "./components/qualitative/teleop/layout.js";
import QualEndGameLayout from "./components/qualitative/endgame/layout.js";
import PageButtons from "./components/navigationButtons";
import MenuElements from "./components/menus.js";
import TextBox from "./layout.js";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isQuantitativeMode, setIsQuantitativeMode] = useState(true);
  const [showTextBox, setShowTextBox] = useState(true);

  const qualpages = [AutoLayout, QualTeleopLayout, QualEndGameLayout];
  const quantpages = [AutoLayout, QuantTeleopLayout, QuantEndGameLayout];

  const handleLeftButtonClick = () => {
    setCurrentPage(prevPage => (prevPage > 0 ? prevPage - 1 : (isQuantitativeMode ? quantpages : qualpages).length - 1));
  };

  const handleRightButtonClick = () => {
    setCurrentPage(prevPage => (prevPage < (isQuantitativeMode ? quantpages : qualpages).length - 1 ? prevPage + 1 : 0));
  };

  const handleSetQuantitativeMode = (mode) => {
    setIsQuantitativeMode(mode);
  };

  const handleNextButtonClick = () => {
    setShowTextBox(false);
    setCurrentPage(0);
  };

  const choosePage = () => {
    const PageComponent = isQuantitativeMode ? quantpages[currentPage] : qualpages[currentPage];
    return !showTextBox && <div>{PageComponent && <PageComponent key={currentPage} />}</div>;
  };

  return (
    <div>
      <MenuElements/>
      {showTextBox && <TextBox setQuantitativeMode={handleSetQuantitativeMode} onNextButtonClick={handleNextButtonClick} />}
      <div>{choosePage()}</div>
      <PageButtons onLeftButtonClick={handleLeftButtonClick} onRightButtonClick={handleRightButtonClick} />
    </div>
  );
}


export default App;
