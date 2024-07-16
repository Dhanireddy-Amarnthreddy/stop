import React, { useState, useRef } from 'react';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    // Format time to display mm:ss:ms
    let milliseconds = (`0${(time % 1000)}`).slice(-3);
    let seconds = (`0${Math.floor(time / 1000) % 60}`).slice(-2);
    let minutes = (`0${Math.floor(time / 60000)}`).slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <p className="time">{formatTime(elapsedTime)}</p>
      <div className="controls">
        <button onClick={startStopwatch}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetStopwatch} disabled={elapsedTime === 0 || isRunning}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
