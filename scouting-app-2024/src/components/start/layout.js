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

  return (
    <div className="center-container">
      <div className="textbox-container">
        <input
          type="text"
          value={nameValue}
          onChange={handleNameChange}
          className="glowing-textbox"
          placeholder="Name"
        />
      </div>
      <div className="textbox-container" style={{ marginTop: "7px" }}>
        <input
          type="text"
          value={matchValue}
          onChange={handleMatchChange}
          className="glowing-textbox"
          placeholder="Match #"
        />
      </div>
        <input
            type="button"
            value={nameValue}
            onChange={handleNameChange}
            className="NextButton"
            placeholder="Next >"
          />
    </div>
  );
};

export default TextBox;
