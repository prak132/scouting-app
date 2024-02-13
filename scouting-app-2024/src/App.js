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
import Fin from "./components/gameend/layout.js";
import Notif from "./toast.js";

function App() {
  //notifs
  const [lastRemovedAction, setLastRemovedAction] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  // sketchy logic
  const [sentMatches, setSentMatches] = useState([]);
  // timer
  const [timerActive, setTimerActive] = useState(false);
  const [time, setTime] = useState(0);
  const [initialDelayComplete, setInitialDelayComplete] = useState(false);
  const [teleended, setteleended] = useState(false);
  const [gameended, setgameended] = useState(false);
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
  
  async function handleStoreDataClick() {
    let data = {};
    if (modeActiveButton === "quan") {
      data = {
        mode: "Qualitative",
        name: nameValue,
        robotposition: selectedPosition,
        autoteam: selectedTeamNumber,
        alliance: false ? "Red" : "Blue",
        notescoring: clickedNotes,
        telescore: quantTelescoredTeams,
        endscore: quantEndSetScoredTeams,
      };
    } else {
      data = {
        mode: "Quantitative",
        name: nameValue,
        robotposition: selectedPosition,
        autoteam: selectedTeamNumber,
        alliance: false ? "Red" : "Blue",
        notescoring: clickedNotes,
        telescore: qualTeleopscoredTeams,
        teletex: qualTeleoptext,
        endscore: qualEndscoredTeams,
        endact: qualEndactions,
      };
    }
    localStorage.setItem(matchValue, JSON.stringify(data));
    console.log(`Data stored for match ${matchValue}`);
  }
  

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
  const qualpages = [AutoLayout, QualTeleopLayout, QualEndGameLayout, Fin];
  const quantpages = [AutoLayout, QuantTeleopLayout, QuantEndGameLayout, Fin];
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    const selAlliance = Cookies.get("selAlliance");
    const numbers = selAlliance === "0" ? JSON.parse(Cookies.get("blueTeamNumbers")) || [] : selAlliance === "1" ? JSON.parse(Cookies.get("redTeamNumbers")) || [] : [];
    setTeamNumbers(numbers);
    setIsMatchReady(selectedPosition !== '' && selectedTeamNumber !== '');
  }, [isModalOpen, selectedPosition, selectedTeamNumber]);

  useEffect(() => {
    if (initialDelayComplete) {
      setCurrentPage(1);
    } 
    if (teleended) {
      setCurrentPage(2);
    }
    if (gameended) {
      setCurrentPage(3);
    }
  }, [initialDelayComplete, teleended, gameended]);

  
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
          if (prevTeams.length > 0) {
            const removedAction = prevTeams[prevTeams.length - 1];
            const removedTeam = removedAction[0];
            setLastRemovedAction(`Removed ${removedTeam} scored`);      
            return prevTeams.slice(0, -1);
          }
          return prevTeams;
        });
        setShowNotif(true);
        setTimeout(() => setShowNotif(false), 2000);
      }
      else if (currentPage === 2) {
        setquantEndSetScoredTeams(prevTeams => {
          if (prevTeams.length > 0) {
            const removedAction = prevTeams[prevTeams.length - 1];
            const removedTeam = removedAction[0];
            setLastRemovedAction(`Removed ${removedTeam}`);
            return prevTeams.slice(0, -1);
          }
          return prevTeams;
        });
        setShowNotif(true);
        setTimeout(() => setShowNotif(false), 2000);
      }
    }
  };

  async function sendsomestuff(payload) {
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

  async function handleSendDataClick() {
    if (!localStorage.getItem(matchValue)) {
      await handleStoreDataClick();
    }
    let localKeys = Object.keys(localStorage);
    if (localKeys.length > 0) {
    for (let key of localKeys) {
      if (!sentMatches.includes(key)) {
          let storedData = JSON.parse(localStorage.getItem(key));
          let payload = { [key]: [storedData] };
          try {
            await sendsomestuff(payload);
            console.log(`sending ${key}`);
            setSentMatches(prevSentMatches => [...prevSentMatches, key]);
            localStorage.removeItem(key);
            console.log(`match ${key} removed`);
          } catch (error) {
            console.error(`ERROR NOOO ${key}: ${error}`);
          }
        }
      }
      console.log("All pending data sent");
    } else {
      console.log("No data to send");
    }
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
    const isNotFinPage = currentPage !== pages.length - 1;
    const showUndoDev = (isQuantitativeMode && (currentPage === 1 || currentPage === 2)) && !devMode && isNotFinPage;
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
          onStoreDataClick={handleStoreDataClick}
          onSendDataClick={handleSendDataClick}
        />}
      {showUndoDev && <UndoDev onUndoClick={undoLastAction} onInfoClick={handleInfoClick} />}
      </div>
    ) : null;
  };  
  

  return (
    <div>
      {lastRemovedAction && <Notif contents={lastRemovedAction} launchNotif={showNotif}/>}
      <MenuElements />
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
      <Timer active={timerActive} time={time} setTime={setTime} initialDelayComplete={initialDelayComplete} setInitialDelayComplete={setInitialDelayComplete} setteleended={setteleended} setgameended={setgameended}/>
      </div>
      <div>{choosePage()}</div>
      <PageButtons onLeftButtonClick={handleLeftButtonClick} onRightButtonClick={handleRightButtonClick} setDevMode={setDevMode} />
    </div>
  );
}

export default App;
