import React, { useState } from 'react';
import Cookies from "js-cookie";
import { initializeBluetooth, transferDataToDevice, handleIncomingData } from './Bluetooth.js';
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

  const handleDataReceived = (receivedData) => {
    const decodedData = new TextDecoder().decode(receivedData.buffer);
    console.log('Received data:', decodedData);
    const parsedData = JSON.parse(decodedData);
    console.log('Parsed data as JSON:', parsedData);
  };
      

  const sendDataToBluetooth = async () => {
    try {
      const userData = Cookies.get("teamNumbers");
      console.log('Cookie data:', userData);
      const server = await initializeBluetooth();
      if (server) {
        await transferDataToDevice(server, userData);
        await handleIncomingData(server, handleDataReceived);
      }
    } catch (error) {
      console.error('Error sending/receiving data to/from Bluetooth device:', error);
    }
  };

  return (
    <div>
      <MenuElements />
      <button onClick={sendDataToBluetooth}>Send Data</button>
      {showTextBox && <TextBox setQuantitativeMode={handleSetQuantitativeMode} onNextButtonClick={handleNextButtonClick} />}
      <div>{choosePage()}</div>
      <PageButtons onLeftButtonClick={handleLeftButtonClick} onRightButtonClick={handleRightButtonClick} />
    </div>
  );
}

export default App;
