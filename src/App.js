import React, { useState, useEffect, Fragment } from 'react';
// import { Link } from "react-router-dom";
const START_MINUTES = '00';
const START_SECOND = '00';
const START_DERATION = 10;
let speed = 1000;

export default function App() {
  const [currentMinutes, setMinutes] = useState(START_MINUTES);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DERATION);
  const [isRunning, setIsRunning] = useState(false);
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const handleMinChange = event => {
    setMin(event.target.value);

    console.log('value is:', event.target.value);
  };

  const handleSecChange = event => {
    setSec(event.target.value);

    console.log('value is:', event.target.value);
  };

  const startHandler = () => {
    setDuration(parseInt(sec, 10) + 60 * parseInt(min, 10));
    // setMinutes(60 * 5);
    // setSeconds(0);
    setIsRunning(true);
  };

  let speedHandler = (speedArg) => {
    speed = speedArg;
    return;
  }
  const stopHandler = () => {
    // stop timer
    setIsStop(true);
    setIsRunning(false);
  };
  const resetHandler = () => {
    setMinutes(START_MINUTES);
    setSeconds(START_SECOND);
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DERATION);
  };

  const resumeHandler = () => {
    let newDuration =
      parseInt(currentMinutes, 10) * 60 + parseInt(currentSeconds, 10);
    setDuration(newDuration);

    setIsRunning(true);
    setIsStop(false);
  };

  useEffect(() => {
    if (isRunning === true) {
      let timer = duration;
      var minutes, seconds;
      const interval = setInterval(function () {
        if (--timer <= 0) {
          resetHandler();
        } else {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;

          setMinutes(minutes);
          setSeconds(seconds);
        }
      }, speed);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <Fragment>
      <div class="row mt-4">
        <div class="col-8 offset-2">
          <div class="card">
            <div className="App">
              <h3 class="text-center">Countdown Timer</h3>
              <div class="row">
                <div class="col-6">
                <input
                type="text"
                class="form-control col-6"
                id="min"
                name="min"
                onChange={handleMinChange}
                value={min}
                />
                </div>
                <div class="col-6">
                <input
                type="text"
                id="sec"
                class="form-control col-6"
                name="sec"
                onChange={handleSecChange}
                value={sec}
                />
                </div>                
              </div>
              <div class="row">
                <div class="col-12 d-flex align-items-center justify-content-center">
                  <div className="time" class="text-center fs-2 mt-3">
                    {currentMinutes}
                    <span className="mx-3">:</span>
                    {currentSeconds}
                    <br/>
                    <div class="mt-3">
                      <button
                        onClick={speedHandler(1000)}
                        className="btn btn-outline-secondary btn-lg inline"
                        disabled={isRunning && isStop}
                      >
                        X1
                      </button>
                      <button
                        onClick={speedHandler(500)}
                        className="btn btn-outline-secondary btn-lg inline"
                        disabled={isRunning && isStop}
                      >
                        X2
                      </button>
                      <button
                        onClick={speedHandler(250)}
                        className="btn btn-outline-secondary btn-lg inline"
                        disabled={isRunning && isStop}
                      >
                        X3
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-12 d-flex align-items-center justify-content-center">
                  {!isRunning && !isStop && (
                    <button
                      onClick={startHandler}
                      className="btn btn-primary btn-lg inline me-3"
                    >
                      START
                    </button>
                  )}
                  {isRunning && (
                    <button
                      onClick={stopHandler}
                      className="btn btn-danger btn-lg inline me-3"
                    >
                      STOP
                    </button>
                  )}

                  {isStop && (
                    <button
                      onClick={resumeHandler}
                      className="btn btn-success btn-lg inline me-3"
                    >
                      RESUME
                    </button>
                  )}
                  <button
                    onClick={resetHandler}
                    className="btn btn-outline-secondary btn-lg inline"
                    disabled={!isRunning && !isStop}
                  >
                    RESET
                  </button>
                </div>
              </div>
              
              {/* <p>{duration}</p> */}
            </div>            
            </div>
        </div>
      </div>
    </Fragment>
  );
}
