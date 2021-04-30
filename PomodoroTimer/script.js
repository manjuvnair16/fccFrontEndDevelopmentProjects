const { useState, useEffect } = React;

function PomodoroClock() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerName, setTimerName] = useState("Session");
  const [timerStatus, setTimerStatus] = useState("pause");
  const [timeLeft, setTimeLeft] = useState(1500);

  function useHandlePlayAlarm() {
    let alarmSound = document.getElementById("beep");
    alarmSound.play();
  }

  function useHandleZeroTimer() {
    if (timerName === "Session") {
      setTimerName("Break");
      setTimeLeft(breakLength * 60);
    } else {
      setTimerName("Session");
      setTimeLeft(sessionLength * 60);
    }
  }

  useEffect(() => {
    let beginCount;
    if (timerStatus === "play") {
      beginCount = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft === 1) {
          useHandlePlayAlarm();
        }
        if (timeLeft === 0) {
          useHandleZeroTimer();
        }

      }, 1000);
    }
    return () => clearInterval(beginCount);

  }, [timeLeft, timerStatus, timerName]);

  function handlePlayOrPause() {
    if (timerStatus === "pause") {
      setTimerStatus("play");

    } else {
      setTimerStatus("pause");
    }
  }

  function handleReset() {
    setBreakLength(5);
    setSessionLength(25);
    setTimerName("Session");
    setTimerStatus("pause");
    setTimeLeft(1500);
    let alarmSound = document.getElementById("beep");
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }

  function handleBrkDecrement() {
    if (breakLength !== 1) {
      setBreakLength(breakLength - 1);
      if (timerName === "Break") {
        setTimeLeft((breakLength - 1) * 60);
      }
    }
  }
  function handleBrkIncrement() {
    if (breakLength !== 60) {
      setBreakLength(breakLength + 1);
      if (timerName === "Break") {
        setTimeLeft((breakLength + 1) * 60);
      }
    }

  }
  function handleSessDecrement() {
    if (sessionLength !== 1) {
      setSessionLength(sessionLength - 1);
      if (timerName === "Session") {
        setTimeLeft((sessionLength - 1) * 60);
      }
    }

  }
  function handleSessIncrement() {
    if (sessionLength !== 60) {
      setSessionLength(sessionLength + 1);
      if (timerName === "Session") {
        setTimeLeft((sessionLength + 1) * 60);
      }
    }

  }


  function formatTimeLeft() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft - minutes * 60;
    minutes = minutes > 9 ? minutes : '0' + minutes;
    seconds = seconds > 9 ? seconds : '0' + seconds;
    return minutes + ':' + seconds;
  }

  const playOrPause = timerStatus === "pause" ? /*#__PURE__*/React.createElement("i", { class: "fas fa-play fa-sm" }) : /*#__PURE__*/React.createElement("i", { class: "fas fa-pause" });

  return /*#__PURE__*/(
    React.createElement("div", { id: "main" }, /*#__PURE__*/
    React.createElement("div", { id: "wrapper" }, /*#__PURE__*/
    React.createElement("h1", null, "Pomodoro Clock"), /*#__PURE__*/
    React.createElement("div", { id: "labels" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h3", { id: "break-display" }, "Break Length"), /*#__PURE__*/
    React.createElement("h3", { id: "session-display" }, "Session Length")), /*#__PURE__*/

    React.createElement(DisplayTimeLength, {
      BrkLength: breakLength,
      SessLength: sessionLength,

      handleBrkDecrement: handleBrkDecrement,
      handleBrkIncrement: handleBrkIncrement,

      handleSessDecrement: handleSessDecrement,
      handleSessIncrement: handleSessIncrement })), /*#__PURE__*/




    React.createElement("div", { id: "timers" }, /*#__PURE__*/
    React.createElement("div", { id: "display-time-wrapper" }, /*#__PURE__*/
    React.createElement("div", { id: "timer-label" }, timerName), /*#__PURE__*/
    React.createElement("div", { id: "time-left" }, formatTimeLeft()), /*#__PURE__*/
    React.createElement("div", { id: "audio-btns" }, /*#__PURE__*/
    React.createElement("span", null, "   ", /*#__PURE__*/React.createElement("button", { id: "start_stop", onClick: handlePlayOrPause }, " ", playOrPause, " "), " "), /*#__PURE__*/
    React.createElement("span", null, "  ", /*#__PURE__*/React.createElement("button", { id: "reset", onClick: handleReset }, /*#__PURE__*/React.createElement("i", { class: "fas fa-undo" })))), /*#__PURE__*/

    React.createElement("audio", { id: "beep", src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })))), /*#__PURE__*/



    React.createElement("footer", null, "image source: https://www.pexels.com/")));




}

function DisplayTimeLength(props) {
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("span", { id: "break-label" }, /*#__PURE__*/
    React.createElement("button", { id: "break-decrement", value: "-", onClick: props.handleBrkDecrement }, " ", /*#__PURE__*/React.createElement("i", { class: "fas fa-minus" }, " "), " "), /*#__PURE__*/
    React.createElement("span", { id: "break-length" }, props.BrkLength), /*#__PURE__*/
    React.createElement("button", { id: "break-increment", value: "+", onClick: props.handleBrkIncrement }, " ", /*#__PURE__*/React.createElement("i", { class: "fas fa-plus" }, " "), " ")), /*#__PURE__*/

    React.createElement("span", { id: "session-label" }, /*#__PURE__*/
    React.createElement("button", { id: "session-decrement", value: "-", onClick: props.handleSessDecrement }, " ", /*#__PURE__*/React.createElement("i", { class: "fas fa-minus" }, " "), " "), /*#__PURE__*/
    React.createElement("span", { id: "session-length" }, props.SessLength), /*#__PURE__*/
    React.createElement("button", { id: "session-increment", value: "+", onClick: props.handleSessIncrement }, " ", /*#__PURE__*/React.createElement("i", { class: "fas fa-plus" }, " "), " "))));



}
/*
function DisplayTimer(props){
  const playOrPause = (props.timerStatus === "pause") ? <i class="fas fa-play"></i> : <i class="fas fa-pause"></i>;
  return(
    <div id="display-time-wrapper">
      <div id="timer-label">{props.timerName}</div>
      <div id="time-left">{props.timeLeft}</div>
      <span>   <button id="start_stop" onClick={props.handlePlayOrPause}> {playOrPause} </button> </span>*/
{/* <span>  <button id="pause">{playOrPause}</button></span>*/}
/*   <span>  <button id="reset" onClick={props.handleReset}><i class="fas fa-undo"></i></button></span>
   <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>
   
   
 </div>  
);
}*/

ReactDOM.render( /*#__PURE__*/React.createElement(PomodoroClock, null), document.getElementById("root"));