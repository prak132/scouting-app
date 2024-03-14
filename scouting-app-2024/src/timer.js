import React, { useEffect, useRef } from 'react';

const Timer = ({ active, time, setTime, initialDelayComplete, setInitialDelayComplete, setteleended, setgameended }) => {
  const startTime = useRef(null);

  useEffect(() => {
    let interval;
    let timerDelay;
    if (active) {
      startTime.current = Date.now();
      interval = setInterval(() => {
        setTime(prevTime => {
          const elapsed = (Date.now() - startTime.current) / 1000;
          if (elapsed >= 15 && !initialDelayComplete) {
            clearInterval(interval);
            timerDelay = setTimeout(() => {
              setInitialDelayComplete(true);
            }, 3000);
            return 0;
          } if (initialDelayComplete && elapsed >= 115) { //115
            setteleended(true);
          } if (initialDelayComplete && elapsed >= 135) { //135
            setgameended(true);
            clearInterval(interval);
            clearTimeout(timerDelay);
            return 135;
          }
          return elapsed;
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