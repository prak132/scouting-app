import React, { useState, useEffect } from "react";
import Errorx from "./assets/errorx.svg";
import "./errorToast.css";

const Notif = ({ contents }) => {
  const [notifications, setNotifications] = useState([]);
  const addNotification = (contents) => {
    const newNotification = {
      id: `notification_${new Date().getTime()}_${Math.random()}`,
      contents,
    };
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== newNotification.id)
      );
    }, 2000);
  };
  useEffect(() => {
    if (contents) {
      addNotification(contents);
    }
  }, [contents]);
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
