import React, { useState, useEffect } from "react";
import Check from "./assets/check.svg";
import "./toast.css";

const Notif = ({ contents, launchNotif }) => {
  const [animate, setAnimate] = useState(false);

  const startAnimation = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1200);
  };

  useEffect(() => {
    if (launchNotif) {
      startAnimation();
    }
  }, [launchNotif]);

  return (
    <div>
      {true && (
        <div>
          <div className={`toastNotif ${animate ? 'animate' : 'toastNotif'}`}>
            <img src={Check} alt="check" />
            <div id="toastContents">
              {contents}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notif;
