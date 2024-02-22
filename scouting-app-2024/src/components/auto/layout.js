import React, { useState, useEffect } from "react";
import "./layout.css";
import red_auto from "./assets/red_auto.svg";
import blue_auto from "./assets/blue_auto.svg";
import Notif from "./toast.js";

const AutoLayout = ({ time, clickedNotes, setClickedNotes, isPreNoteScored, onlickYes, onlickNo, somethingnonono, selAlliance }) => {
  const [showNotif, setShowNotif] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState({});
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
      setDisabledButtons(prevState => ({ ...prevState, [noteIndex]: true }));
    }
  };

  const isNoteHidden = (noteIndex) => {
    return clickedNotes.some(note => note[0] === noteIndex);
  };

  return (
    <div>
      <Notif contents={"Note Scored"} launchNotif={showNotif} setLaunchNotif={setShowNotif} />
      
      <div style={{ paddingTop: "25vh" }}>
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <p className={somethingnonono ? "hide" : "show"} style = {{fontFamily: 'Poppins', fontSize: '20px', fontStyle: 'normal', lineHeight: 'normal', fontWeight: '600', color: '#7d7d7d'}}>Pre Note Scored?</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className={((isPreNoteScored === true || isPreNoteScored === false) && isPreNoteScored !== null) ? "hide" : "show"} onClick={onlickYes} style={{ width: '50%', height: '40px', backgroundColor: '#000614', color: '#7d7d7d', fontFamily: 'Poppins', fontSize: '20px', fontStyle: 'normal', lineHeight: 'normal', fontWeight: '600', border: '1px solid #33B864', borderRadius: '10px', marginRight: '5px' }}>
          yes
        </button>
        <button className={((isPreNoteScored === true || isPreNoteScored === false) && isPreNoteScored !== null) ? "hide" : "show"} onClick={onlickNo} style={{ width: '50%', height: '40px', backgroundColor: '#000614', color: '#7d7d7d', fontFamily: 'Poppins', fontSize: '20px', fontStyle: 'normal', lineHeight: 'normal', fontWeight: '600', border: '1px solid #e32636', borderRadius: '10px', marginLeft: '5px' }}>
          no
        </button>
      </div>
      <div className="svg-bounding">
        <img src={autoMapSrc} alt="auto-img" className="auto-map" />
        <div className="notes-upper">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              disabled={!!disabledButtons[index]}
              className={`note-button ${isNoteHidden(index) ? "note-button-hidden" : ""}`}
              onClick={() => handleNoteClick(index)}
            ></button>
          ))}
        </div>
        <div className={`notes-lower ${allianceClass}`}>
          {[...Array(3)].map((_, index) => (
            <button
              key={index + 5}
              disabled={!!disabledButtons[index+5]}
              className={`note-button ${isNoteHidden(index + 5) ? "note-button-hidden" : ""}`}
              onClick={() => handleNoteClick(index + 5)}
            ></button>
          ))}
        </div>
      </div>
      <div className="scroll-buffer"></div>
    </div>
  );
};

export default AutoLayout;