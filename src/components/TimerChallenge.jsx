import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  const timerInterval = 10;//milliseconds

  if(timeRemaining <= 0){
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
    }, timerInterval);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  function handleReset(){
    //WARNING !! - setting a state inside a function can cause an infinite loop
    //as a state update triggers a function reload. But since this function will only
    //be called once based on the if check this should be okay
    setTimeRemaining(targetTime * 1000);
  }

  return (
    <>
     <ResultModal ref={dialog} targetTime={targetTime} remainingTime={(timeRemaining/1000).toFixed(2)} result={timerIsActive ? "won" : "lost"} onReset={handleReset}/> 

      <section className="challenge">
        <h2>{title}</h2>
        {/* Dealt with using the result modal now*/}
        {/* {timerExpired && <p>You lost !!</p>} */}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Timer running" : "Timer stopped"}
        </p>
      </section>
    </>
  );
}
