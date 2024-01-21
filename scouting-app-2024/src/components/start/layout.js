import React, { useState, useEffect } from "react";
import { fetchDataAndSaveToFile } from "./data.js";
import "./TextBox.css";

const TextBox = () => {
  const [matchesData, setMatchesData] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [eventValue, setEventValue] = useState("");
  const [matchValue, setMatchValue] = useState("");

  useEffect(() => {
    const eventData = {
      "Los Angeles Regional": { key: "2023cala"},
      "Chezy Champs": { key: "2023cc"},
      "Silicon Valley Regional": { key: "2023casj"},
    };

    const selectedEvent = "Los Angeles Regional";
    const selectedEventData = eventData[selectedEvent];
    const authKey = 'l3mMnNWP1BVGuj9iEMoqpoZb3Oe18tpmpA79GQShKGBEW63PvIO2e4ksnDDFatbw';

    fetchDataAndSaveToFile(selectedEventData.key, authKey);
  }, []);

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleEventChange = (e) => {
    const selectedEvent = e.target.value;
    setEventValue(selectedEvent);
    const selectedEventData = eventData[selectedEvent];
    fetchDataAndSaveToFile(selectedEventData.key, authKey);
  };


  const handleMatchChange = (e) => {
    setMatchValue(e.target.value);
  };

  const handleNextButtonClick = () => {
    console.log("test1");
  };

  const handleBlueButtonClick = () => {
    console.log("bluee");
  };

  const handleRedButtonClick = () => {
    console.log("redd");
  };

  return (
    <div className="center-container">
      <div className="textbox-container">
        <input
          type="text"
          value={nameValue}
          onChange={handleNameChange}
          className="glowing-textbox text"
          placeholder="Name"
        />
      </div>
      <div className="glowing-dropdown" style={{ marginTop: "7px" }}>
        <select
          value={eventValue}
          onChange={handleEventChange}
        >
          {Object.keys(eventData).map((eventName, index) => (
            <option key={index} value={eventName}>
              {eventName}
            </option>
          ))}
        </select>
      </div>
      <div className="glowing-dropdown" style={{ marginTop: "7px" }}>
        <select
          value={matchValue}
          onChange={handleMatchChange}
        >
          {matchesData.map((matchKey, index) => (
            <option key={index} value={matchKey}>
              {matchKey}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleBlueButtonClick}
        className="NextButton"
      >
        Blue
      </button>
      <button
        type="button"
        onClick={handleRedButtonClick}
        className="NextButton"
      >
        Red
      </button>
      <button
        type="button"
        onClick={handleNextButtonClick}
        className="NextButton"
      >
        Next {">"}
      </button>
    </div>
  );
};

export default TextBox;
