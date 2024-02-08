import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import "./App.css";
import AutoLayout from "./components/auto/layout.js";
import QuantTeleopLayout from "./components/quantitative/teleop/layout.js";
import QuantEndGameLayout from "./components/quantitative/endgame/layout.js";
import QualTeleopLayout from "./components/qualitative/teleop/layout.js";
import QualEndGameLayout from "./components/qualitative/endgame/layout.js";
import PageButtons from "./navigationButtons.js";
import MenuElements from "./components/menus.js";
import TextBox from "./layout.js";
import DevPage from "./components/devPage.js";
import Timer from "./timer.js";
import UndoDev from "./undoinfo.js";


function App() {
  // timer
  const [timerActive, setTimerActive] = useState(false);
  const [time, setTime] = useState(0);
  // quant teletop scoring
  const [quantTelescoredTeams, quantTeleSetScoredTeams] = useState([]);
  // quant endgame scoring
  const [quantEndSetScoredTeams, setquantEndSetScoredTeams] = useState([]);
  // qual teleop defense
  const [qualTeleopscoredTeams, qualTeleopsetScoredTeams] = useState([]);
  // qual teleop notes
  const [qualTeleoptext, qualTeleopsetText] = useState('');
  // qual endgame defense
  const [qualEndscoredTeams, qualEndsetScoredTeams] = useState([]);
  // qual endgame climbing/harmonizing
  const [qualEndactions, qualEndsetActions] = useState({ climbed: [], harmonized: [] });
  // auto note scoring
  const [clickedNotes, setClickedNotes] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [isQuantitativeMode, setIsQuantitativeMode] = useState(true);
  const [showTextBox, setShowTextBox] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamNumbers, setTeamNumbers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedTeamNumber, setSelectedTeamNumber] = useState('');
  const [isMatchReady, setIsMatchReady] = useState(false);
  const qualpages = [AutoLayout, QualTeleopLayout, QualEndGameLayout];
  const quantpages = [AutoLayout, QuantTeleopLayout, QuantEndGameLayout];
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    const selAlliance = Cookies.get("selAlliance");
    const numbers = selAlliance === "0" ? JSON.parse(Cookies.get("blueTeamNumbers")) || [] : selAlliance === "1" ? JSON.parse(Cookies.get("redTeamNumbers")) || [] : [];
    setTeamNumbers(numbers);
    setIsMatchReady(selectedPosition !== '' && selectedTeamNumber !== '');
  }, [isModalOpen, selectedPosition, selectedTeamNumber]);
  
  const handleLeftButtonClick = () => {
    const totalPages = devMode ? [DevPage, AutoLayout, QuantTeleopLayout, QuantEndGameLayout, QualTeleopLayout, QualEndGameLayout, TextBox].length : (isQuantitativeMode ? quantpages : qualpages).length;
    setCurrentPage(prevPage => (prevPage > 0 ? prevPage - 1 : totalPages - 1));
  };
  
  const handleRightButtonClick = () => {
    const totalPages = devMode ? [DevPage, AutoLayout, QuantTeleopLayout, QuantEndGameLayout, QualTeleopLayout, QualEndGameLayout, TextBox].length : (isQuantitativeMode ? quantpages : qualpages).length;
    setCurrentPage(prevPage => (prevPage < totalPages - 1 ? prevPage + 1 : 0));
  };
  

  const handleSetQuantitativeMode = (mode) => {
    setIsQuantitativeMode(mode);
  };

  const handleNextButtonClick = () => {
    setShowTextBox(false);
    setCurrentPage(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTime(0);
    setTimerActive(true);
    setIsModalOpen(false);
  }

  
  const handleSelectPosition = (position) => {
    setSelectedPosition(position);
  };
  
  const handleSelectTeamNumber = (number) => {
    setSelectedTeamNumber(number);
  };
  
  const choosePage = () => {
    let pages = isQuantitativeMode ? quantpages : qualpages;
    if (devMode) {pages = [DevPage, AutoLayout, QuantTeleopLayout, QuantEndGameLayout, QualTeleopLayout, QualEndGameLayout, TextBox];}
    const PageComponent = pages[currentPage];
    return (!showTextBox && !devMode) || devMode ? (
      <div>
        {PageComponent && <PageComponent key={currentPage} 
          selectedPosition={selectedPosition}
          time={time}
          quantTelescoredTeams={quantTelescoredTeams}
          quantTeleSetScoredTeams={quantTeleSetScoredTeams}
          quantEndSetScoredTeams={quantEndSetScoredTeams}
          setquantEndSetScoredTeams={setquantEndSetScoredTeams}
          qualTeleopscoredTeams={qualTeleopscoredTeams}
          qualTeleopsetScoredTeams={qualTeleopsetScoredTeams}
          qualTeleoptext={qualTeleoptext}
          qualTeleopsetText={qualTeleopsetText}
          qualEndscoredTeams={qualEndscoredTeams}
          qualEndsetScoredTeams={qualEndsetScoredTeams}
          qualEndactions={qualEndactions}
          qualEndsetActions={qualEndsetActions}
          clickedNotes={clickedNotes}
          setClickedNotes={setClickedNotes}
        />}
        {(isQuantitativeMode || currentPage === AutoLayout) && !devMode && <UndoDev />}
      </div>
    ) : null;
  };  
  

  return (
    <div>
     
      <MenuElements />
      {showTextBox && <TextBox setQuantitativeMode={handleSetQuantitativeMode} onNextButtonClick={handleNextButtonClick} />}
      <div>
      {isModalOpen && !devMode && (
          <div className="modalthingpopup">
            <div className="modal-content">
              <h2>Choose Position and Team</h2>
              <div className="position-buttons-container">
                {['Left', 'Middle', 'Right'].map((position) => (
                  <button
                    key={position}
                    className={`position-buttons ${selectedPosition === position ? 'position-selected' : ''}`}
                    onClick={() => handleSelectPosition(position)}
                  >
                    {position}
                  </button>
                ))}
              </div>
              <h3>Team Numbers</h3>
              <div className="team-numbers-container">
                {teamNumbers.map((number) => (
                  <button
                    key={number}
                    className={`team-numbers ${selectedTeamNumber === number ? 'team-number-selected' : ''}`}
                    onClick={() => handleSelectTeamNumber(number)}
                  >
                    {number}
                  </button>
                ))}
            </div>
              <button
                className={`teamModalButton ${isMatchReady ? 'teamModalButton-glow' : ''}`}
                onClick={closeModal}
                disabled={!isMatchReady}
              >
                Start Match
              </button>
            </div>
            <div className="overlay"></div>
          </div>
        )}
      </div>
      <div>
      <Timer active={timerActive} time={time} setTime={setTime} />
      </div>
      <div>{choosePage()}</div>
      <PageButtons onLeftButtonClick={handleLeftButtonClick} onRightButtonClick={handleRightButtonClick} setDevMode={setDevMode} />
    </div>
  );
}

export default App;
