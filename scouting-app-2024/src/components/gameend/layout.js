import React, { useState } from "react";


const EndOfGameLayout = ({ onStoreDataClick, onSendDataClick }) => {
 const [storeClicked, setStoreClicked] = useState(false);
 const [sendClicked, setSendClicked] = useState(false);


 const handleStoreClick = () => {
   setStoreClicked(true);
   setSendClicked(false);
   onStoreDataClick();
 };


 const handleSendClick = () => {
   setSendClicked(true);
   setStoreClicked(false);
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
           color: storeClicked ? "white" : "#7d7d7d",
           borderColor: storeClicked ? "white" : "#000614",
           backgroundColor: '#000614',
         }}
         onClick={handleStoreClick}
       >
         Store Data (no wifi)
       </button>
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
         Send Data (wifi)
       </button>
     </div>
     <div className="scroll-buffer"></div>
   </div>
 );
};


export default EndOfGameLayout;





