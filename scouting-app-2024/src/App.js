import React, { useState } from 'react';
import "./App.css";
import AutoLayout from "./components/auto/layout.js";
import QuantTeleopLayout from "./components/quantitative/teleop/layout.js";
import QuantEndGameLayout from "./components/quantitative/endgame/layout.js";
import QualTeleopLayout from "./components/qualitative/teleop/layout.js";
import QualEndGameLayout from "./components/qualitative/endgame/layout.js";
import PageButtons from "./components/navigationButtons";
import MenuElements from "./components/menus.js";
import StartLayout from "./layout.js";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isQuantitativeMode, setQuantitativeMode] = useState(true);
  const qualpages = [StartLayout, AutoLayout, QualTeleopLayout, QualEndGameLayout];
  const quantpages = [StartLayout, AutoLayout, QuantTeleopLayout, QuantEndGameLayout];

  const handleLeftButtonClick = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : (isQuantitativeMode ? quantpages.length - 1 : qualpages.length - 1)));
  };

  const handleRightButtonClick = () => {
    setCurrentPage((prevPage) => (prevPage < (isQuantitativeMode ? quantpages.length - 1 : qualpages.length - 1) ? prevPage + 1 : 0));
  };

  const handleQualitativeButtonClick = () => {
    setQuantitativeMode(false);
  };

  const handleQuantitativeButtonClick = () => {
    setQuantitativeMode(true);
  };

  const choosePage = () => {
    const PageComponent = isQuantitativeMode ? quantpages[currentPage] : qualpages[currentPage];
    return <PageComponent key={currentPage} />;
  };

  return (
    <div>
      <MenuElements />
      <StartLayout
        onQualitativeButtonClick={handleQualitativeButtonClick}
        onQuantitativeButtonClick={handleQuantitativeButtonClick}
      />
      <div>{choosePage()}</div>
      <PageButtons onLeftButtonClick={handleLeftButtonClick} onRightButtonClick={handleRightButtonClick} />
    </div>
  );
}

export default App;