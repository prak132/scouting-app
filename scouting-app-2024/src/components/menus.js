import React from 'react';
import Logo from "./assets/monkeylogo.svg";
import "./menu.css";

const PageButtons = ({ onTopButtonClick, onMiddleButtonClick, onBottomButtonClick }) => {
  return (
    <div>
        <div className='topBar'>
            <img src={Logo} className='logo'></img>
            <div className='topButtons'>
                <button className='button topButton'></button>
                <button className='button midButton'></button>
                <button className='button bottomButton'></button>
            </div>
        </div>
    </div>
  );
};

export default PageButtons;
