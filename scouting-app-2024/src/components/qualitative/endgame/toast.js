import React, { useState, useEffect } from "react";
import Check from "../../../assets/check.svg";

const Notif = ({ contents, launchNotif, setLaunchNotif }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (launchNotif) {

      const newNotification = {
        id: new Date().getTime(),
        contents: contents,
      };

      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);

      setTimeout(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== newNotification.id)
        );
      }, 1200);
      setLaunchNotif(false);
    }
  }, [launchNotif, contents, setLaunchNotif]);

  return (
    <div>
      {notifications.map((notification) => (
        <div key={notification.id} className="toastNotifEndgame animateEndgame">
          <img src={Check} alt="check" />
          <div id="toastContentsEndgame">{notification.contents}</div>
        </div>
      ))}
    </div>
  );
};

export default Notif;