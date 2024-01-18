import React, { useState } from "react";
import "./TextBox.css";

const TextBox = () => {
  const [nameValue, setNameValue] = useState("");
  const [matchValue, setMatchValue] = useState("");

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleMatchChange = (e) => {
    setMatchValue(e.target.value);
  };

  const handleNextButtonClick = () => {
    console.log("test1");
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
      <div className="textbox-container" style={{ marginTop: "7px" }}>
        <input
          type="text"
          value={matchValue}
          onChange={handleMatchChange}
          className="glowing-textbox text"
          placeholder="Match #"
        />
      </div>
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
