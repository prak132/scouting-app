import React from 'react';
import Logo from "./assets/monkeylogo.svg";
import "./menu.css";

const MenuElements = ({ onTopButtonClick, onBottomButtonClick, onMonkeyClick }) => {
  return (
    <div>
        <div className='topBar'>
            <img src={Logo} alt='funkylogo' className='logo'></img>
            <div className='topButtons'>
                <button className='button topButton'></button>
                <button className='button bottomButton'></button>
            </div>
        </div>
        <div className='yellowOverlay'>.</div>
    </div>
  );
};

export default MenuElements;
