import React, { useEffect } from 'react';

const Timer = ({ active, time, setTime, initialDelayComplete, setInitialDelayComplete, setteleended, setgameended }) => {
  useEffect(() => {
    let interval;
    let timerDelay;
    if (active) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime >= 15 && !initialDelayComplete) {
            clearInterval(interval);
            timerDelay = setTimeout(() => {
              setInitialDelayComplete(true);
            }, 3000);
            return 0;
          } if (initialDelayComplete && prevTime >= 105) {
            setteleended(true);
          } if (initialDelayComplete && prevTime >= 135) {
            setgameended(true);
            clearInterval(interval);
            clearTimeout(timerDelay);
            return 135;
          }
          return prevTime + 0.01;
        });
      }, 10);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timerDelay);
    };
    // eslint-disable-next-line
  }, [active, setTime, initialDelayComplete]);

  const formattedTime = time.toFixed(2);
  
  return (
    <div style={{ marginTop: '-100px'}}>
      {time >= 150 ? "Match Ended" : `Timer: ${formattedTime}`}
    </div>
  );
};

export default Timer;
