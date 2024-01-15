import React from "react";
import AmpButton from './ampButton.js';
import SpeakerButton from './speakerButton.js';

const TeleopLayout = () => {
    const handleAmpButton = () => {
        console.log("test1");
    };

    const handleSpeakerButton = () => {
        console.log("test2");
    };
    const elapsedTime = 2.23;

    return (
    <div>
        <div type="teleop-text" style={{ display: "flex", alignItems: "center", justifyContent: "center", marginRight: '10px' }}>
        <div type = "teleop-text" style={{ background: 'linear-gradient(#FFFFFF, #FFFFFF00)', color: 'white', fontSize: 48, fontWeight: '700', wordWrap: 'break-word', paddingRight: '220px', letterSpacing: '3px', backgroundClip: 'text', paddingTop: '178px'}}>
            Teleop
        </div>
        </div>

        <div style={{color: 'rgba(255, 255, 255, 0.50)', display: "flex", alignItems: "center", justifyContent: "center", marginRight: '200px', fontSize: 20, fontWeight: '400', wordWrap: 'break-word'}}>
            Scoring • Timer: {elapsedTime}s
        </div>

        <div>
          <AmpButton onSelect={handleAmpButton} />
          <SpeakerButton onSelect={handleSpeakerButton} />
        </div>
    </div>


    );
};

export default TeleopLayout;
