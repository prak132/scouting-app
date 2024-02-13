import React, { useState, useEffect } from "react";
import Errorx from "./assets/errorx.svg";
import "./errorToast.css";

const Notif = ({ contents, launchNotif }) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    if (launchNotif) {
      const newNotification = {
        id: `${new Date().getTime()}_${Math.random()}`,
        contents: contents,
      };
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
      setTimeout(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== newNotification.id)
        );
      }, 1200);
    }
  }, [launchNotif, contents]);


  return (
    <div>
      {notifications.map((notification) => (
        <div key={notification.id} className="toastNotifLayout animateLayout">
          <img src={Errorx} alt="Errorx" />
          <div id="toastContentsLayout">{notification.contents}</div>
        </div>
      ))}
    </div>
  );
};

export default Notif;
