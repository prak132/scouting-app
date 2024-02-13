import React, { useState } from 'react';
import Logo from "../assets/monkeylogo.svg";
import "./menu.css";
import Cookies from "js-cookie";

const MenuElements = ({ onTopButtonClick, onBottomButtonClick, onMonkeyClick }) => {
  const [yellowMode, setYellowMode] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmRefreshModal, setShowConfirmRefreshModal] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  const handleLogoClick = () => {
    setYellowMode(!yellowMode);
  };

  function refreshPage() {
    const bug = ["hey", "go", "back"];
    Cookies.set("selAlliance", "1");
    Cookies.set("blueTeamNumbers", JSON.stringify(bug));
    Cookies.set("redTeamNumbers", JSON.stringify(bug));
    window.location.reload(false);
  }
  
  const confirmRefresh = () => {
    setShowConfirmRefreshModal(true);
  };
  
  return (
    <div>
      <div className='topBar'>
        <img src={Logo} alt='funkylogo' className='logo' onClick={handleLogoClick}></img>
        <div className='topButtons'>
          <button onClick={confirmRefresh} className='button topButton'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='icon'>
              <path fill='#454545' d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/>
            </svg>
          </button>
          <div style={{ fontSize: '12px', zIndex: '1', marginBottom: '5px' }} onClick={toggleModal} className='button'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" className='icon3'>
              <path fill='#454545' d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/>
            </svg>
          </div>
          {showConfirmRefreshModal && (
          <div className="popup">
            <div className="modalcontent">
              <h2>Are you sure you want to refresh the page?</h2>
              <p>You will lose all your progress/data</p>
              <div className="modalButtonContainer">
                <button className='modalButtonYes' onClick={refreshPage}>
                  Yes
                </button>
                <button className='modalButtonNo' onClick={() => setShowConfirmRefreshModal(false)}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
          {isModalOpen && (
            <div className="popup">
              <div className="modal-content">
                <h2>How To Use</h2>
                <p>
                  <li>Click on either the Red or Blue alliance.</li>
                  <li>Distinguish between qualitative and quantitative assessments.</li>
                  <li>Complete the auto page for both categories.</li>
                  <li>Record each point scored for quantitative analysis.</li>
                  <li>Assess scoring defense for qualitative insights.</li>
                  <li>Fill out the endgame section based on the chosen assessment method.</li>
                  <li><b>HAVE FUN 🤗</b></li>
                </p>
                <button className='modalButton' onClick={toggleModal}>
                    Close
                </button>
                <div className="overlay" onClick={toggleModal}></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`${yellowMode === true ? "buttonActive" : "yellowOverlay"}`}></div>
    </div>
  );
};


export default MenuElements;