import React, { useEffect } from 'react';

const Timer = ({ active, time, setTime }) => {
  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime >= 150) {
            clearInterval(interval);
            return 150;
          }
          return prevTime + 0.01;
        });
      }, 10);
    }
    return () => clearInterval(interval);
  }, [active, setTime]);

  const formattedTime = time.toFixed(2);
  
  return (
    <div style={{ marginTop: '-100px', color: "rgba(255, 255, 255, 0.50)", width: "70vw", fontSize: "4vw", }}>
      {time >= 150 ? "Match Ended" : `Timer: ${formattedTime}`}
    </div>
  );
};

export default Timer;
