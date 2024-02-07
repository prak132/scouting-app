import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime = 0}) => {
  const [time, setTime] = useState(initialTime);
  // we need the timer on like all the other pages
  // should start on modal start match
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime+0.01 >= 150) {
          clearInterval(interval);
          return prevTime;
        }
        return prevTime + 0.01;
      });
    }, 10);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toFixed(2);

  

  return( 
	<div style={{ marginTop: '-100px', color: "rgba(255, 255, 255, 0.50)", width: "70vw", fontSize: "4vw",}}>Timer: {formattedTime}</div>
  )
};

export default Timer;