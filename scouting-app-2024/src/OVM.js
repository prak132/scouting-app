import React, {useState} from 'react';
import matchesData from "./data/match.json";
import teamData from "./data/team.json";

const OVMode = ( {ovmTextThing, ovmTextsetThing, onSendDataClick, nameValue, setNameValue, matchValue, setMatchValue, teamNumbers, handleSelectTeamNumber, selectedTeamNumber, setTeamNumbers, selectedTeamOVM, setSelectedTeamOVM} ) => {
    const [sendClicked, setSendClicked] = useState(false);
    const [blueTeamNumbers, setBlueTeamNumbers] = useState([]);
    const [redTeamNumbers, setRedTeamNumbers] = useState([]);

    const handleNameChange = (e) => {
        setNameValue(e.target.value);
    };

    const handleMatchChange = (e) => {
        setMatchValue(e.target.value);
        const matchKey = '2024idbo_qm' + e.target.value;
        const matchData = teamData[matchKey];  
        if (matchData) {
            setBlueTeamNumbers(matchData.blue);
            setRedTeamNumbers(matchData.red);
        }
    };

    const handleSendClick = () => {
      setSendClicked(true);
      onSendDataClick();
    };

    const handleTextThingChange = (event) => {
        ovmTextsetThing(event.target.value);
    };
    return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div
        style={{
            width: '100%',
            height: '24rem',
            textAlign: 'center',
            backgroundColor: '#00000000',
            padding: '20px',
            boxSizing: 'border-box',
        }}
        >
        <div className="textbox-container">
            <input
            type="text"
            value={nameValue}
            onChange={handleNameChange}
            className="glowing-textbox text"
            placeholder="Name"
            id="nameInput"
            />
        </div>
        <div className="glowing-dropdown" style={{ marginTop: "7px" }}>
            <input
            type="text"
            list="matchOptions"
            value={matchValue}
            onChange={handleMatchChange}
            placeholder="Select a match"
            className="glowing-dropdown-input text"
            id="matchInput"
            inputMode="numeric"
            pattern="[0-9]*"        
            />
            <datalist id="matchOptions">
            {matchesData.map((matchKey, index) => (
                <option key={index} value={matchKey.replace('2024idbo_qm', '')} />
            ))}
            </datalist>
        </div>
        <div className="position-buttons">
        <div className="blue-team">
                {blueTeamNumbers.map((number) => (
                    <button
                    key={number}
                    className={`position-buttons ${selectedTeamNumber === number ? 'position-selected' : ''}`}
                    onClick={() => { handleSelectTeamNumber(number); setSelectedTeamOVM("0"); }}
                    >
                    {number}
                    </button>
                ))}
            </div>
            <div className="red-team">
                {redTeamNumbers.map((number) => (
                    <button
                    key={number}
                    className={`position-buttons ${selectedTeamNumber === number ? 'position-selected' : ''}`}
                    onClick={() => { handleSelectTeamNumber(number); setSelectedTeamOVM("1"); }}
                    >
                    {number}
                    </button>
                ))}
            </div>
        </div>        <h2
            style={{
            margin: '0',
            fontFamily: 'Poppins',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal',
            color: 'transparent',
            background: 'linear-gradient(181deg, #FFF 1.05%, rgba(255, 255, 255, 0.00) 126.16%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            }}
        >
            Notes
        </h2>
        <textarea
            onChange={handleTextThingChange}
            value={ovmTextThing}
            style={{
            width: '100%',
            height: '65%',
            boxSizing: 'border-box',
            marginTop: '10px',
            backgroundColor: '#000614',
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal',
            border: '1px solid #2F3953',
            color: '#FFFFFF',
            textAlign: 'left',
            verticalAlign: 'top',
            boxShadow: '0px 0px 51px 5px rgba(255, 255, 255, 0.25)',
            overflow: 'auto',  
            resize: 'none',  
            padding: '10px',
            borderRadius: '10px',
            }}
            placeholder="Describe driver abilities. Make sure to add team number as well"
        />
        <button
            style={{
            borderRadius: "10px",
            width: "100%",
            height: "100px",
            margin: "5px",
            fontSize: "20px",
            fontWeight: "700",
            color: sendClicked ? "white" : "#7d7d7d",
            borderColor: sendClicked ? "white" : "#000614",
            backgroundColor: '#FFFFFF',
            }}
            onClick={handleSendClick}
        >
            Finish Notes
        </button>
        </div>
    </div>
    );
};    

export default OVMode;