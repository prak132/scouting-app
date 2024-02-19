import React, { useState } from 'react';
import Logo from "../assets/monkeylogo.svg";
import "./menu.css";

const MenuElements = ({ onsendsomething, setBlueTeamNumbers, setRedTeamNumbers, setSelAlliance }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmRefreshModal, setShowConfirmRefreshModal] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  const handleLogoClick = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  function refreshPage() {
    const bug = ["hey", "go", "back"];
    setSelAlliance("1");
    setBlueTeamNumbers(bug);
    setRedTeamNumbers(bug);
    window.location.reload(false);
  }
  
  const confirmRefresh = () => {
    setShowConfirmRefreshModal(true);
  };

  return (
    <div>
      <div className='topBar'>
        <img onClick={handleLogoClick} src={Logo} alt='funkylogo' className='logo'></img>
        <div className='topButtons'>
          <button onClick={confirmRefresh} className='button topButton'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='icon'>
              <path fill='#454545' d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/>
            </svg>
          </button>
          <button onClick={onsendsomething} className='button middleButton'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className='icon'>
              <path fill='#454545' d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/>
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
    </div>
  );
};


export default MenuElements;