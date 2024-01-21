import React, { useState } from "react";
import "./App.css";
import AutoLayout from "./components/auto/layout.js";
import TeleopLayout from "./components/quantitative/teleop/layout.js";
import StartLayout from "./components/start/layout.js";
import PageButtons from "./components/navigationButtons";
import MenuElements from "./components/menus.js";
import QualTeleopLayout from "./components/qualitative/teleop/layout.js";

/* 
1 - team {i} - {j}
2 - map press {i}
3 - endgame team {i} - {j}

var stack = [];
stack.push(1);
stack.push(2);
stack.pop();
console.log(stack);
*/

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const pages = [StartLayout, TeleopLayout, AutoLayout, QualTeleopLayout];
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
  const elapsedTime = 1501;
  return (
    <div >
      <MenuElements/>
      <div>{choosePage(elapsedTime)}</div>
      <PageButtons onLeftButtonClick={handleLeftButtonClick} onRightButtonClick={handleRightButtonClick} />
    </div>
  );
}

export default App;