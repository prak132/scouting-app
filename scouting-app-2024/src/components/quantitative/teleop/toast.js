import React, { useState, useEffect } from "react";
import Check from "../../../assets/check.svg";
import "./toast.css";

const Notif = ({ contents, launchNotif }) => {
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
    }
  }, [launchNotif, contents]);

  return (
    <div>
      {notifications.map((notification) => (
        <div key={notification.id} className="toastNotif animate">
          <img src={Check} alt="check" />
          <div id="toastContents">{notification.contents}</div>
        </div>
      ))}
    </div>
  );
};

export default Notif;

