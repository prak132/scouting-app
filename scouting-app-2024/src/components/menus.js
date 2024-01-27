import React, { useState } from 'react';
import Logo from "./assets/monkeylogo.svg";
import "./menu.css";

/*
$cyan: #007AE5;
$tiles: 5;

body {
  background-color: #eee;
}

.wrapper {
  height: 100vh;
  text-align: center;
  
  button {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}

.loader {
  $parent: &;

  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 0;
  height: 100vh;
  transition: width 0s 1.4s ease;
  
  #{$parent}__icon {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    opacity: 0;
    transition: opacity .5s ease;
    
    svg {
      transform-origin: 0 0;
    }
  }
  
  #{$parent}__tile {
    position: absolute;
    left: 0;
    width: 0;
    height: 20%;
    background-color: $cyan;
    transition: width .7s ease;
    
    @for $i from 0 through $tiles {
      &:nth-child(#{$i}) {
        top: calc(#{$i - 1} * 20%);
        transition-delay: #{($i - 1) * 0.2s};
      }
    }
  }
  
  &--active {
    width: 100%;
    transition-delay: 0s;
    
    #{$parent}__icon {
      opacity: 1;
      transition: opacity .5s 1.4s ease;
  
    
    #{$parent}__tile {
      width: 100%;

      @for $i from 0 through $tiles {
        &:nth-child(#{$i}) {
          transition-delay: #{($i - 1) * 0.2s};
        }
      }
    }
  }
}
*/

const MenuElements = ({ onTopButtonClick, onBottomButtonClick, onMonkeyClick }) => {
  
  const [yellowMode, setYellowMode] = useState(0);

  const handleLogoClick = () => {
    setYellowMode(!yellowMode);
  };

  return (
    <div>
        <div className='topBar'>
            <img src={Logo} alt='funkylogo' className='logo' onClick={handleLogoClick}></img>
            <div className='topButtons'>
                <button className='button topButton'></button>
                <button className='button bottomButton'></button>
            </div>
        </div>
        <div className={`${yellowMode === true ? "buttonActive" : "yellowOverlay"}`}></div>
    </div>
  );
};

export default MenuElements;
