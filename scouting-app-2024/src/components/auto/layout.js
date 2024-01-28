import React, { useState } from "react";
import BlueAuto from "./assets/red_auto.svg";
import "./layout.css";

const AutoLayout = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [clickedNotes, setClickedNotes] = useState([]);
  const elapsedTime = 2.23;
  const pos = ["Left", "Middle", "Right"];

  const handlePositionClick = (position) => {
    setSelectedPosition(position);
  };

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
    console.log("Clicked Notes:", newClickedNotes);
  };
  

  return (
    <div>
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
        <img src={BlueAuto} alt="auto-img" className="auto-map" />
        <div className="notes-upper">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              className={`note-button ${clickedNotes.some((note) => note.includes(index)) ? "clicked" : ""}`}
              onClick={() => handleNoteClick(index)}
            ></button>
          ))}
        </div>
        <div className="notes-lower">
          {[...Array(3)].map((_, index) => (
            <button
              key={index}
              className={`note-button ${clickedNotes.some((note) => note.includes(index + 5)) ? "clicked" : ""}`}
              onClick={() => handleNoteClick(index + 5)}
            ></button>
          ))}
        </div>
      </div>

      <div className="position-bounds">
        {pos.map((position, index) => (
          <div
            key={index}
            className={`position-button blue-${position.toLowerCase()} ${
              selectedPosition === position ? "selected" : ""
            }`}
            onClick={() => handlePositionClick(position)}
          >
            {position}
          </div>
        ))}
      </div>

      <div className="scroll-buffer"></div>
    </div>
  );
};

export default AutoLayout;
