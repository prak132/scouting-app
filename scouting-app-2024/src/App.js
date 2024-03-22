import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
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
import Ntoif from "./toasty.js";
import RedMap from "./assets/red_minimap.svg";
import BlueMap from "./assets/blue_minimap.svg";
import img1 from "./assets/blue_minimap.svg";
import img2 from "./assets/check.svg";
import img3 from "./assets/errorx.svg";
import img4 from "./assets/exclamation.svg";
import img5 from "./assets/red_minimap.svg";
import img6 from "./assets/monkeylogo.svg";
import img7 from "./components/auto/assets/blue_auto.svg";
import img8 from "./components/auto/assets/red_auto.svg";
import img9 from "./components/auto/assets/check.svg";
import OVMpage from "./OVM.js";

function App() {
  // IMPORTANT FOR ALLIANCES AND OTHER STUFF
  const [blueTeamNumbers, setBlueTeamNumbers] = useState([]);
  const [redTeamNumbers, setRedTeamNumbers] = useState([]);
  const [selAlliance, setSelAlliance] = useState(0);
  //notifs
  const [lastRemovedAction, setLastRemovedAction] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  const [showNtoif, setShowNtoif] = useState(false);
  // sketchy logic
  const [sentMatches, setSentMatches] = useState([]);
  const [showConfirmSendModal, setShowConfirmSendModal] = useState(false);
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
  const [ovmTextThing, ovmTextsetThing] = useState('');
  // qual teleop table
  const [qualTelerows, qualTeleSetRows] = useState(Array.from({ length: 3 }, (_, index) => index + 1));
  const [qualTeleteamOptions, qualTelesetTeamOptions] = useState([]);
  // qual endgame defense
  const [qualEndscoredTeams, qualEndsetScoredTeams] = useState([]);
  const [teamButtonState, setTeamButtonState] = useState({
    blue: Array(3).fill(false),
    red: Array(3).fill(false)
  });
  // qual endgame climbing/harmonizing
  const [qualEndactions, qualEndsetActions] = useState({ climbed: [], harmonized: [] });
  const [qualEndRows, qualEndSetRows] = useState(Array.from({ length: 3 }, (_, index) => index + 1));
  const [qualEndTeamOptions, qualEndSetTeamOptions] = useState([]);
  // auto note scoring
  const [clickedNotes, setClickedNotes] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [isPreNoteScored, setIsPreNoteScored] = useState(null);
  const [somethingnonono, setsomething] = useState(false);
  const [OVM, setOVM] = useState(false);
  // data of the person scouting,

  // OM stuff
  const [selectedTeamOVM, setSelectedTeamOVM] = useState(null);

  function handleOVMButtonClick () {
    setOVM(true);
    setShowTextBox(false);
  }
  const [nameValue, setNameValue] = useState("");
  useEffect(() => {
    const storedNameValue = Cookies.get("nameVal");
    if (storedNameValue !== undefined) {
      setNameValue(JSON.parse(storedNameValue));
    }
  }, []);
  // which match
  const [matchValue, setMatchValue] = useState("");
  // which alliance
  const [activeButton, setActiveButton] = useState(null);
  // offense or defense
  const [modeActiveButton, setModeActiveButton] = useState(null);
  const [devMode, setDevMode] = useState(false);

  async function handleStoreDataClick() {
    let data = {};
    if (devMode) {
      data = {
        mode: "Dev",
        name: "Aadharsh",
        num: selectedTeamNumber,
        ratings: devScoredTeams,
      };
    } else if (OVM) {
      data = {
        mode: "OM",
        name: nameValue,
        alliance: selectedTeamOVM === "0" ? "Blue" : "Red",
        team: selectedTeamNumber,
        notes: ovmTextThing,
      };
    }
    else if (modeActiveButton === "quan") {
      data = {
        mode: "Quantitative",
        name: nameValue,
        robotposition: selectedPosition,
        autoteam: selectedTeamNumber,
        alliance: selAlliance === "0" ? "Blue" : "Red",
        notescoring: clickedNotes,
        telescore: quantTelescoredTeams,
        endscore: quantEndSetScoredTeams,
      };
    } else {
      data = {
        mode: "Qualitative",
        name: nameValue,
        robotposition: selectedPosition,
        autoteam: selectedTeamNumber,
        alliance: selAlliance === "0" ? "Blue" : "Red",
        notescoring: clickedNotes,
        telescore: qualTeleopscoredTeams,
        teletex: qualTeleoptext,
        endscore: qualEndscoredTeams,
        endact: qualEndactions,
      };
    }
    localStorage.setItem("2024idbo_qm"+matchValue, JSON.stringify(data));
    console.log(`Data stored for match 2024idbo_qm+${matchValue}`);
  }

  const onlickYes = () => {
    clickedNotes.push([-1, time.toFixed(2)]);
    setIsPreNoteScored(true);
    setsomething(true);
  }

  const onlickNo = () => {
    setIsPreNoteScored(false);
    setsomething(true);
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
  // dev mode
  const [devRows, devSetRows] = useState(Array.from({ length: 3 }, (_, index) => index + 1));
  const [devTeamOptions, devSetTeamOptions] = useState([]);
  const [devScoredTeams, devSetScoredTeams] = useState([]);
  // others
  const [devModeKey, setDevModeKey] = useState('');
  const [maxPageReached, setMaxPageReached] = useState(0);

  useEffect(() => {
    const numbers = selAlliance === "0" ? (Array.isArray(blueTeamNumbers) ? blueTeamNumbers : []) : selAlliance === "1" ? (Array.isArray(redTeamNumbers) ? redTeamNumbers : []) : [];
    setTeamNumbers(numbers);
    setIsMatchReady(selectedPosition !== '' && selectedTeamNumber !== '');
  }, [isModalOpen, selectedPosition, selectedTeamNumber, blueTeamNumbers, redTeamNumbers, selAlliance]);

  useEffect(() => {
    let targetPage = currentPage;
    if (initialDelayComplete) {
      targetPage = 1;
    }
    if (teleended) {
      targetPage = 2;
    }
    if (gameended) {
      targetPage = 3;
    }
    if (targetPage !== currentPage) {
      setCurrentPage(targetPage);
      setMaxPageReached(prevMax => Math.max(prevMax, targetPage));
    }
    // eslint-disable-next-line
  }, [initialDelayComplete, teleended, gameended]);
  
  
  const handleLeftButtonClick = () => {
    if (devMode) {
      setCurrentPage(prevPage => Math.max((prevPage - 1), 0));
    } else {
      setCurrentPage(prevPage => Math.max((prevPage - 1), 0));
    }
  };
  
  function coolfakerefresh() {
    /*
      replace window.location.reload(false);
      first call this function
      with moving back to the showTextBox page
      setucurrentpage to 0
    */
    // this was all hand done
    setBlueTeamNumbers([]);
    setRedTeamNumbers([]);
    setSelAlliance(0);
    setLastRemovedAction('');
    setShowNotif(false);
    setShowNtoif(false);
    setSentMatches([]);
    setShowConfirmSendModal(false);
    setTimerActive(false);
    setTime(0);
    setInitialDelayComplete(false);
    setteleended(false);
    setgameended(false);
    quantTeleSetScoredTeams([]);
    setquantEndSetScoredTeams([]);
    qualTeleopsetScoredTeams([]);
    qualTeleopsetText('');
    qualTeleSetRows(Array.from({ length: 3 }, (_, index) => index + 1));
    qualTelesetTeamOptions([]);
    qualEndsetScoredTeams([]);
    setTeamButtonState({
      blue: Array(3).fill(false),
      red: Array(3).fill(false)
    });
    qualEndsetActions({ climbed: [], harmonized: [] });
    qualEndSetRows(Array.from({ length: 3 }, (_, index) => index + 1));
    qualEndSetTeamOptions([]);
    setClickedNotes([]);
    setDisabledButtons([]);
    setIsPreNoteScored(null);
    setsomething(false);
    setMatchValue("");
    setActiveButton(null);
    setModeActiveButton(null);
    setDevMode(false);
    setCurrentPage(0);
    setIsQuantitativeMode(true);
    setShowTextBox(true);
    setIsModalOpen(false);
    setTeamNumbers([]);
    setSelectedPosition('');
    setSelectedTeamNumber('');
    setIsMatchReady(false);
    devSetRows(Array.from({ length: 3 }, (_, index) => index + 1));
    devSetTeamOptions([]);
    devSetScoredTeams([]);
    setDevModeKey('');
    setMaxPageReached(0);
    ovmTextsetThing('');
    setOVM(false);
    setSelectedTeamOVM(null);
    console.clear();
  }
  
  
  const handleRightButtonClick = () => { 
    if (devMode) {
      setCurrentPage(prevPage => {
        const nextPage = prevPage + 1;
        const totalPages = [DevPage, AutoLayout, QuantTeleopLayout, QuantEndGameLayout, QualTeleopLayout, QualEndGameLayout, TextBox].length;
        return nextPage < totalPages ? nextPage : 0;
      });
    } else {
      setCurrentPage(prevPage => {
        const nextPage = prevPage + 1;
        return nextPage <= maxPageReached ? nextPage : prevPage;
      });
    }
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
    if (currentPage === 0) {
      setClickedNotes((prevNotes) => prevNotes.slice(0, -1));
      setDisabledButtons((prevState) => prevState.slice(0, -1));
      setLastRemovedAction(`Removed Note`);
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 2000);
    }
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

  const exportToJson = async () => {
    let localKeys = Object.keys(localStorage);
    if (localKeys.length > 0) {
    for (let key of localKeys) {
      if (!sentMatches.includes(key)) {
          let storedData = JSON.parse(localStorage.getItem(key));
          let payload = { [key]: [storedData] };
          try {
            const jsonData = JSON.stringify(payload);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${key}.json`;
            link.click();
            setSentMatches(prevSentMatches => [...prevSentMatches, key]);
            localStorage.removeItem(key);
            console.log(`match ${key} removed`);
          } catch (error) {
            setLastRemovedAction(`ERROR NOOO ${key}: ${error}`);
            setShowNotif(true);
            setTimeout(() => setShowNotif(false), 2000);      
          }
        }
      }
      console.log("All pending data sent");
      coolfakerefresh();
    } else {
      setLastRemovedAction(`No data to send`);
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 2000);
    } setShowConfirmSendModal(false);
  };

  const handleConfirmSend = async () => {
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
            setLastRemovedAction(`All pending data sent`);
            setShowNtoif(true);
            setTimeout(() => setShowNtoif(false), 2000);      
          } catch (error) {
            setLastRemovedAction(`Failed to send Data`);
            setShowConfirmSendModal(false);
            setShowNotif(true);
            setTimeout(() => setShowNotif(false), 2000);
          }
        }
      }
    } else {
      setLastRemovedAction(`No data to send`);
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 2000);
    } setShowConfirmSendModal(false);
  };

  async function sendsomestuff(payload) {
    const urls = [
      'https://eft-knowing-horse.ngrok-free.app/data',
      'https://a6317d1d-b519-421a-902d-18069f2ccd87-00-163c5eeh1muo2.picard.replit.dev/data'
    ];
  
    const requests = urls.map(url =>
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    );
    const response = await Promise.race(requests);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log("Response data:", responseData);
  }
  function onsendsomething() {
    setShowConfirmSendModal(true);
  }

  async function handleSendDataClick() {
    if (!localStorage.getItem("2024idbo_qm"+matchValue)) {
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
      setLastRemovedAction(`All pending data sent`);
      setShowNtoif(true);
      setTimeout(() => setShowNtoif(false), 2000);
      coolfakerefresh();
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
    if (OVM) {
      return <OVMpage ovmTextThing={ovmTextThing} ovmTextsetThing={ovmTextsetThing} onSendDataClick={handleSendDataClick} nameValue={nameValue} setNameValue={setNameValue} matchValue={matchValue} setMatchValue={setMatchValue} teamNumbers={teamNumbers} handleSelectTeamNumber={handleSelectTeamNumber} selectedTeamNumber={selectedTeamNumber} setTeamNumbers={setTeamNumbers} selectedTeamOVM={selectedTeamOVM} setSelectedTeamOVM={setSelectedTeamOVM}/>;
    }  
    let pages = isQuantitativeMode ? quantpages : qualpages;
    if (devMode) {pages = [DevPage, AutoLayout, QuantTeleopLayout, QuantEndGameLayout, QualTeleopLayout, QualEndGameLayout, TextBox];}
    const PageComponent = pages[currentPage];
    const isNotFinPage = currentPage !== pages.length - 1;
    const showUndoDev = ((isQuantitativeMode && (currentPage === 1 || currentPage === 2)) || currentPage === 0) && !devMode && isNotFinPage;
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
          disabledButtons={disabledButtons}
          setDisabledButtons={setDisabledButtons}
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
          isPreNoteScored={isPreNoteScored}
          onlickYes={onlickYes}
          onlickNo={onlickNo}
          somethingnonono={somethingnonono}
          qualTelerows={qualTelerows}
          qualTeleSetRows={qualTeleSetRows}
          qualTeleteamOptions={qualTeleteamOptions}
          qualTelesetTeamOptions={qualTelesetTeamOptions}
          teamButtonState={teamButtonState}
          setTeamButtonState={setTeamButtonState}
          qualEndRows={qualEndRows}
          qualEndSetRows={qualEndSetRows}
          qualEndTeamOptions={qualEndTeamOptions}
          qualEndSetTeamOptions={qualEndSetTeamOptions}
          blueTeamNumbers={blueTeamNumbers}
          setBlueTeamNumbers={setBlueTeamNumbers}
          redTeamNumbers={redTeamNumbers}
          setRedTeamNumbers={setRedTeamNumbers}
          selAlliance={selAlliance}
          setSelAlliance={setSelAlliance}
          devRows={devRows}
          devSetRows={devSetRows}
          devTeamOptions={devTeamOptions}
          devSetTeamOptions={devSetTeamOptions}
          devScoredTeams={devScoredTeams}
          devSetScoredTeams={devSetScoredTeams}
          handleFinishClick={handleStoreDataClick}
          selectedTeamNumber={selectedTeamNumber}
        />}
      {showUndoDev && <UndoDev onUndoClick={undoLastAction} onInfoClick={handleInfoClick} />}
      </div>
    ) : null;
  };  
  

  return (
    <div>
      <img src={img1} alt="img1" style={{display: "none"}}/>
      <img src={img2} alt="img2" style={{display: "none"}}/>
      <img src={img3} alt="img3" style={{display: "none"}}/>
      <img src={img4} alt="img4" style={{display: "none"}}/>
      <img src={img5} alt="img5" style={{display: "none"}}/>
      <img src={img6} alt="img6" style={{display: "none"}}/>
      <img src={img7} alt="img7" style={{display: "none"}}/>
      <img src={img8} alt="img8" style={{display: "none"}}/>
      <img src={img9} alt="img9" style={{display: "none"}}/>
      <img src={RedMap} alt="img10" style={{display: "none"}}/>
      <img src={BlueMap} alt="img11" style={{display: "none"}}/>
      {showConfirmSendModal && (
        <div className="modalwharpopup">
          <div className="modal-content">
            <h2>Are you sure you want to send the data?</h2>
            <p>Make Sure you are <b>Connected to Wifi</b> and <b>not current in a game</b></p>
            <div className="modalButtonContainer">
              <button className='modalButtonYes' onClick={handleConfirmSend}>
                Yes
              </button>
              <button className='modalButtonNo' onClick={() => setShowConfirmSendModal(false)}>
                No
              </button>
            </div>
            <button className='modalButtonPerchance' onClick={exportToJson}>
              Download Data PERMS
            </button>
          </div>
          <div className="overlay"></div>
        </div>
      )}
      {lastRemovedAction && <Ntoif contents={lastRemovedAction} launchNotif={showNtoif}/>}
      {lastRemovedAction && <Notif contents={lastRemovedAction} launchNotif={showNotif}/>}
      <MenuElements onsendsomething={onsendsomething} setBlueTeamNumbers={setBlueTeamNumbers} setRedTeamNumbers={setRedTeamNumbers} setSelAlliance={setSelAlliance} coolfakerefresh={coolfakerefresh} />
      {showTextBox && !devMode && <TextBox setQuantitativeMode={handleSetQuantitativeMode} onNextButtonClick={handleNextButtonClick} nameValue={nameValue}setNameValue={setNameValue} matchValue={matchValue} setMatchValue={setMatchValue} activeButton={activeButton} handleOVMButtonClick={handleOVMButtonClick} setActiveButton={setActiveButton} modeActiveButton={modeActiveButton} setModeActiveButton={setModeActiveButton} setBlueTeamNumbers={setBlueTeamNumbers} setRedTeamNumbers={setRedTeamNumbers} setSelAlliance={setSelAlliance}/>}
      <div>
      {isModalOpen && !devMode && (
          <div className="modalthingpopup">
            <div className="modal-content">
              <div style={{
                fontSize: 22,
                fontWeight: 500,
                marginTop: 20,
                marginBottom: '10%'
              }}>
                Choose Team & Position
              </div>
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
              <img className="mapStyle" src={selAlliance === "0" ? BlueMap : RedMap} alt='minimap'/>
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
      <PageButtons onLeftButtonClick={handleLeftButtonClick} onRightButtonClick={handleRightButtonClick} setDevMode={setDevMode} devModeKey={devModeKey} setDevModeKey={setDevModeKey}/>
    </div>
  );
}

export default App;
