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
  const positionClasses = {
    Left: "position-left",
    Middle: "position-middle",
    Right: "position-right",
  };
  let notesLowerClass = `notes-lower ${positionClasses[selectedPosition] || ""}`;

  const elapsedTime = 2.23;
  useEffect(() => {
    const alliance = Cookies.get("selAlliance");
    setAutoMapSrc(alliance === "0" ? blue_auto : red_auto);
  }, []);

  const handleNoteClick = (noteIndex) => {
    const isNoteClicked = clickedNotes.includes(noteIndex);
  
    if (!isNoteClicked) {
      
      setClickedNotes(prevNotes => [...prevNotes, noteIndex]);
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 1200);
      console.log("Clicked Notes:", [...clickedNotes, noteIndex]);
    } else {
      
      setClickedNotes(prevNotes => prevNotes.filter(note => note !== noteIndex));
      console.log("Clicked Notes:", clickedNotes.filter(note => note !== noteIndex));
    }
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
          Scoring • Timer: {elapsedTime}
        </div>
      </div>
      <div className="svg-bounding">
        <img src={autoMapSrc} alt="auto-img" className="auto-map" />
        <div className="notes-upper">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              className={`note-button ${clickedNotes.includes(index) ? "note-button-hidden" : ""}`}
              onClick={() => handleNoteClick(index)}
            ></button>
          ))}
        </div>
        <div className={notesLowerClass}>
          {[...Array(3)].map((_, index) => (
            <button
              key={index + 5}
              className={`note-button ${clickedNotes.includes(index + 5) ? "note-button-hidden" : ""}`}
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
