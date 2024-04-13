import React, { useState } from 'react';
import styles from "./app.module.css"

function CountdownTimer() {
  const [inputDateTime, setInputDateTime] = useState('');
  const [countdown, setCountdown] = useState("0d 0h 0m 0s");
  const [intervalId, setIntervalId] = useState(null);

  const startCountdown = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const targetDate = new Date(inputDateTime).getTime();

    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const timeDifference = targetDate - now;

      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        setCountdown("Countdown Complete!");
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    setIntervalId(countdownInterval);
  };

  const clearCountdown = () => {
    clearInterval(intervalId);
    setCountdown('0d 0h 0m 0s');
  }

  return (
    <div className={styles.Container}>
      <header><h1> <span> Countdown Timer </span></h1></header>
      
      <div className={styles.Card}>
        <div><label htmlFor="datetime">Enter Date and Time:</label>
      <input 
        type="datetime-local" 
        id="datetime" 
        value={inputDateTime} 
        onChange={(e) => setInputDateTime(e.target.value)} 
      /></div>
        <div><button onClick={startCountdown}>Start Countdown</button>
      <button onClick={clearCountdown}>Clear</button></div>
      
      
      </div>
      
      <div className={styles.Timer} id="countdown"> <span>{countdown}</span> </div>
    </div>
  );
}

export default CountdownTimer;