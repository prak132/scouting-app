import React, { useState, useEffect } from "react";
import "./layout.css";
import red_auto from "./assets/red_auto.svg";
import blue_auto from "./assets/blue_auto.svg";
import Notif from "./toast.js";

const AutoLayout = ({ time, clickedNotes, setClickedNotes, isPreNoteScored, onlickYes, onlickNo, somethingnonono, selAlliance, disabledButtons, setDisabledButtons }) => {
  const [showNotif, setShowNotif] = useState(false);
  const [autoMapSrc, setAutoMapSrc] = useState(red_auto);
  const [allianceClass, setAllianceClass] = useState("");

  useEffect(() => {
    setAutoMapSrc(selAlliance === "0" ? blue_auto : red_auto);
    setAllianceClass(selAlliance === "0" ? "bluenotes" : "rednotes");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
  }, [isPreNoteScored]);
  
  useEffect(() => {
    console.log(clickedNotes);
  }, [clickedNotes]);

  const handleNoteClick = (noteIndex) => {
    const isNoteClicked = clickedNotes.some(note => note[0] === noteIndex);
    if (!isNoteClicked) {
      setClickedNotes(prevNotes => [...prevNotes, [noteIndex, time.toFixed(2)]]);
      setShowNotif(true);
      setDisabledButtons(prevState => [...prevState, noteIndex]);
    }
  };  

  const isNoteHidden = (noteIndex) => {
    return disabledButtons.includes(noteIndex);
  };
  

  return (
    <div>
      <Notif contents={"Note Scored"} launchNotif={showNotif} setLaunchNotif={setShowNotif} />
      
      <div style={{ paddingTop: "18vh" }}>
        <div type="teleop-text">
          <div
            className="title"
            style={{
              color: "white",
              fontSize: "10vw",
              fontWeight: "700",
              wordWrap: "break-word",
              marginBottom: "-0.25vh",
              background: "linear-gradient(#fff, #333), -webkit-linear-gradient(#fff, #333)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Auto
          </div>
        </div>
        <div
          style={{
            color: "rgba(255, 255, 255, 0.50)",
            width: "70vw",
            fontSize: "4vw",
          }}
        >
          Scoring • Timer: {time.toFixed(2)}s
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p className={somethingnonono ? "hide" : "show"} style = {{marginBottom: 0, fontFamily: 'Poppins', fontSize: '20px', fontStyle: 'normal', lineHeight: 'normal', fontWeight: '600', color: '#FFFFFF', }}>Preloaded Scored?</p>
        <button className={((isPreNoteScored === true || isPreNoteScored === false) && isPreNoteScored !== null) ? "hide" : "show"} onClick={onlickYes} style={{background: 'none', border: 'none', marginLeft: '40px',}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{height: '2.2em', verticalAlign: '-2.7em'}}><path fill="green" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>
        </button>
        <button className={((isPreNoteScored === true || isPreNoteScored === false) && isPreNoteScored !== null) ? "hide" : "show"} onClick={onlickNo} style={{background: 'none', border: 'none', marginLeft: '10px',}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{height: '2.2em', verticalAlign: '-2.7em'}}><path fill="red" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
        </button>
      </div>
      <div className="svg-bounding">
        <img src={autoMapSrc} alt="auto-img" className="auto-map" />
        <div className="notes-upper">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              disabled={disabledButtons.includes(index)}
              className={`note-button ${isNoteHidden(index) ? "note-button-hidden" : ""}`}
              onClick={() => handleNoteClick(index)}
            ></button>
          ))}
        </div>
        <div className={`notes-lower ${allianceClass}`}>
          {[...Array(3)].map((_, index) => (
            <button
              key={index + 5}
              disabled={disabledButtons.includes(index+5)}
              className={`note-button ${isNoteHidden(index + 5) ? "note-button-hidden" : ""}`}
              onClick={() => handleNoteClick(index + 5)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoLayout;