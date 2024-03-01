import React, { useState } from "react";


const EndOfGameLayout = ({ onSendDataClick }) => {
 const [sendClicked, setSendClicked] = useState(false);


 const handleSendClick = () => {
   setSendClicked(true);
   onSendDataClick();
 };


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
             background:
               "linear-gradient(#fff, #333), -webkit-linear-gradient(#fff, #333)",
             WebkitBackgroundClip: "text",
             WebkitTextFillColor: "transparent",
           }}
         >
           End of Game
         </div>
       </div>
     </div>
     <div className="button-container">
       <button
         style={{
           borderRadius: "10px",
           width: "50%",
           height: "50px",
           margin: "5px",
           fontSize: "20px",
           fontWeight: "700",
           color: sendClicked ? "white" : "#7d7d7d",
           borderColor: sendClicked ? "white" : "#000614",
           backgroundColor: '#000614',
         }}
         onClick={handleSendClick}
       >
         Finish Game
       </button>
     </div>
     <div className="scroll-buffer"></div>
   </div>
 );
};


export default EndOfGameLayout;





