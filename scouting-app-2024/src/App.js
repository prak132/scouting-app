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
  // data of the person scouting
  const [nameValue, setNameValue] = useState("");
  // which match
  const [matchValue, setMatchValue] = useState("");
  // which alliance
  const [activeButton, setActiveButton] = useState(null);
  // offense or defense
  const [modeActiveButton, setModeActiveButton] = useState(null);
  
  const handleInfoClick = () => {
    console.log('a');
  };

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

  const undoLastAction = () => {
    if (isQuantitativeMode) {
      if (currentPage === 1) {
        quantTeleSetScoredTeams(prevTeams => {
          return prevTeams.length > 0 ? prevTeams.slice(0, -1) : [];
        });
      }
      else if (currentPage === 2) {
        setquantEndSetScoredTeams(prevTeams => {
          return prevTeams.length > 0 ? prevTeams.slice(0, -1) : [];
        });
      }
    }
  };  
  
  async function sendData() {
    let payload = {}; // This will be the final object to send
    let data = {}; // Data object to be nested inside payload
  
    if (modeActiveButton === "quan") {
      data = {
        mode: "Qualitative", // Assuming you want to correct the mismatch here
        name: nameValue, // scouter name
        robotposition: selectedPosition, // auto pos
        autoteam: selectedTeamNumber, // auto team number
        alliance: (false ? "Red" : "Blue"), // alliance color
        notescoring: clickedNotes, // notes on scoring
        telescore: quantTelescoredTeams, // teleop scoring details
        endscore: quantEndSetScoredTeams, // endgame scoring details
      };
    } else {
      data = {
        mode: "Quantitative", // Or "Qualitative" based on your logic
        name: nameValue, // scouter name
        robotposition: selectedPosition, // auto pos
        autoteam: selectedTeamNumber, // auto team number
        alliance: (false ? "Red" : "Blue"), // alliance color
        notescoring: clickedNotes, // notes on scoring
        telescore: qualTeleopscoredTeams, // teleop defense details
        teletex: qualTeleoptext, // teleop notes
        endscore: qualEndscoredTeams, // endgame defense details
        endact: qualEndactions, // endgame actions
      };
    }
    payload[matchValue] = [data];
    const response = await fetch('https://0ee1d6b5-1234-4f5b-9b73-6c504c42fd15-00-bs9n3rjs4ihf.riker.replit.dev/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log("Response data:", responseData);
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
          setQuantitativeMode={handleSetQuantitativeMode} 
          onNextButtonClick={handleNextButtonClick}
          nameValue={nameValue}
          setNameValue={setNameValue}
          matchValue={matchValue}
          setMatchValue={setMatchValue}
          activeButton={activeButton}
          setActiveButton={setActiveButton} 
          modeActiveButton={modeActiveButton} 
          setModeActiveButton={setModeActiveButton}
        />}
        {(isQuantitativeMode || currentPage === AutoLayout) && !devMode && <UndoDev onUndoClick={undoLastAction} onInfoClick={handleInfoClick} />}
      </div>
    ) : null;
  };  
  

  return (
    <div>
     
      <MenuElements sendData={sendData}/>
      {devMode ? <DevPage /> : showTextBox && <TextBox setQuantitativeMode={handleSetQuantitativeMode} onNextButtonClick={handleNextButtonClick} nameValue={nameValue}setNameValue={setNameValue} matchValue={matchValue} setMatchValue={setMatchValue} activeButton={activeButton} setActiveButton={setActiveButton} modeActiveButton={modeActiveButton} setModeActiveButton={setModeActiveButton} />}
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
