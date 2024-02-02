import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./layout.css";
import red_auto from "./assets/red_auto.svg";
import blue_auto from "./assets/blue_auto.svg";
import Notif from "./toast.js";

const AutoLayout = ({ selectedPosition }) => {
  const [clickedNotes, setClickedNotes] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [autoMapSrc, setAutoMapSrc] = useState(red_auto);
  let notesLowerClass = `notes-lower ${
    selectedPosition === "Left" ? "position-left" : 
    selectedPosition === "Middle" ? "position-middle" : 
    selectedPosition === "Right" ? "position-right" : ""}`;  
  const elapsedTime = 2.23;
  useEffect(() => {
    const alliance = Cookies.get("selAlliance");
    setAutoMapSrc(alliance === "0" ? blue_auto : red_auto);
  }, []);


  const handleNoteClick = (noteIndex) => {
    const isNoteClicked = clickedNotes.some((note) => note[1] === noteIndex);
    const newClickedNotes = clickedNotes.map((note) => [...note]);
  
    if (isNoteClicked) {
      const indexToRemove = newClickedNotes.findIndex((note) => note[1] === noteIndex);
      if (indexToRemove !== -1) {
        newClickedNotes.splice(indexToRemove, 1);
      }
    } else {
      const adjustedIndex = noteIndex >= 5 ? noteIndex - 5 : noteIndex;
      const noteArray = [noteIndex >= 5 ? 1 : 0, adjustedIndex];
      newClickedNotes.push(noteArray);
    }
  
    setClickedNotes(newClickedNotes);
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 1200);
    console.log("Clicked Notes:", newClickedNotes);
  };
  

  return (
    <div>
      <Notif contents="Note Scored" launchNotif={showNotif} />
      <div style={{ paddingTop: "15vh" }}>
        <div type="teleop-text">
          <div
            type="teleop-text"
            className="title"
            style={{
              color: "white",
              fontSize: "10vw",
              fontWeight: "700",
              wordWrap: "break-word",
              marginBottom: "-0.25vh",
              background:
                "linear-gradient(#fff, #333), -webkit-linear-gradient(#fff, #333)",
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
          Scoring • Timer: {elapsedTime}s
        </div>
      </div>
      <div className="svg-bounding">
        <img src={autoMapSrc} alt="auto-img" className="auto-map" />
        <div className="notes-upper">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              className={`note-button ${clickedNotes.some((note) => note.includes(index)) ? "clicked" : ""}`}
              onClick={() => handleNoteClick(index)}
            ></button>
          ))}
        </div>
        <div className={notesLowerClass}>
          {[...Array(3)].map((_, index) => (
            <button
              key={index}
              className={`note-button ${clickedNotes.some((note) => note.includes(index + 5)) ? "clicked" : ""}`}
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