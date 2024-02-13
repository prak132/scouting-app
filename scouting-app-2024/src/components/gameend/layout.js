import React from "react";

const EndOfGameLayout = ( {onStoreDataClick, onSendDataClick} ) => {
  return (
    <div>
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
            End of Game
          </div>
        </div>
      </div>
      <div className="button-container">
        <button onClick={onStoreDataClick}>Store Data (no wifi)</button>
        <button onClick={onSendDataClick}>Send Data (wifi)</button>
      </div>
      <div className="scroll-buffer"></div>
    </div>
  );
};

export default EndOfGameLayout;
