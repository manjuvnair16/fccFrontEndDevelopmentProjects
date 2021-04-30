const { useState, useEffect } = React;

const beatBank = [

{
  id: 'Q',
  display: 'Heater-1',
  audioSource: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },


{
  id: 'W',
  display: 'Heater-2',
  audioSource: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },


{
  id: 'E',
  display: 'Heater-3',
  audioSource: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },

{
  id: 'A',
  display: 'Heater-4',
  audioSource: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },

{
  id: 'S',
  display: 'Heater-6',
  audioSource: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },

{
  id: 'D',
  display: 'Open-HH',
  audioSource: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },

{
  id: 'Z',
  display: 'Kick_n_Hat',
  audioSource: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },

{
  id: 'X',
  display: 'Kick',
  audioSource: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },

{
  id: 'C',
  display: 'Closed-HH',
  audioSource: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];




function DrumPad(props) {
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { id: "display" }, /*#__PURE__*/
    React.createElement("h4", { class: "text-center" }, props.display)), /*#__PURE__*/

    React.createElement("div", { id: "drum-vol" }, /*#__PURE__*/
    React.createElement("div", { id: "drumpad-container" },
    beatBank.map(obj => {
      return /*#__PURE__*/(
        React.createElement("button", { className: "drum-pad btn btn-primary",
          id: obj.id,
          onClick: e => props.onClick(e.target.id) },

        obj.id));


    })), /*#__PURE__*/


    React.createElement("div", { id: "vol-bar" }, /*#__PURE__*/
    React.createElement("input", { type: "range", min: "0", max: "1", step: "0.01", id: "volume", name: "volume",
      value: props.sliderVol,
      onChange: e => props.onChange(e.target.value) }), /*#__PURE__*/


    React.createElement("label", { for: "volume" }, "Volume ", props.volDisplay)))));




}

function PlayHistory(props) {
  return /*#__PURE__*/(
    React.createElement("div", { id: "history-controls" }, /*#__PURE__*/
    React.createElement("button", { id: "play-btn", class: "btn", onClick: props.onClick }, /*#__PURE__*/
    React.createElement("i", { class: "fa fa-play fa-2x" }))));







}

function DrumMachine() {

  const [clip, setClip] = useState({});
  const [clickId, setClickId] = useState('');
  const [clicked, setClicked] = useState(false);
  const [sliderVol, setSliderVol] = useState(0.1);
  const [volDisplay, setVolDisplay] = useState();
  const [clipHistory, setClipHistory] = useState([]);
  const [playHistory, setPlayHistory] = useState(false);
  const [historyPlayed, setHistoryPlayed] = useState('green');



  function useSearchClip(targetId) {

    var filteredArr = beatBank.filter(item => item.id === targetId);

    if (filteredArr.length !== 0) {
      var newClip = filteredArr[0];

      setClip(newClip); //although setClip changes the clip information, it is not accessible till the next render
      // because of which the if condition uses the variable newClip, as it contains the latest clip object details

      const sound = new Audio(newClip.audioSource);
      sound.currentTime = 0;
      sound.volume = sliderVol;
      sound.play();
      if (historyPlayed === 'amber') {
        setHistoryPlayed('red');
        var newHistory = [].concat(newClip);
        setClipHistory(newHistory);
      } else {
        var newHistory = [...clipHistory].concat(newClip);
        setClipHistory(newHistory);
      }

    }

  }

  useEffect(() => {
    useSearchClip(clickId);

  }, [clicked]); //this useEffect will run whenever a button has been clicked, hence the clicked state which changes its value at every click. 
  //The clickId cannot be used here, as if the same button is pressed twice, it doesn't invoke useEffect since clickId doesn't change.

  useEffect(() => {

    function handleKeyPress(e) {
      var pressedId = e.key.toUpperCase();
      useSearchClip(pressedId);
    }

    document.getElementById("drum-machine").focus();
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);

  });

  useEffect(() => {
    setVolDisplay(Math.floor(sliderVol * 100));
  }, [sliderVol]);

  useEffect(() => {
    function handlePlayHistory() {

      const mapArray = clipHistory.forEach((beat, i) => {
        setTimeout(() => {
          setClip(beat);
          const beatSound = new Audio(beat.audioSource);
          beatSound.currentTime = 0;
          beatSound.volume = sliderVol;
          beatSound.play();

        }, i * 500);
      });

    }
    handlePlayHistory();
    setHistoryPlayed('amber');

  }, [playHistory]);


  return /*#__PURE__*/(
    React.createElement("div", { id: "main", class: "container-fluid" }, /*#__PURE__*/
    React.createElement("h1", { color: "#909090" }, " Drum Machine"), /*#__PURE__*/
    React.createElement("div", { id: "drum-machine" }, /*#__PURE__*/

    React.createElement(DrumPad, { display: clip.display,
      onClick: i => {setClickId(i);setClicked(prev => !prev);},
      sliderVol: sliderVol,
      onChange: v => setSliderVol(v),
      volDisplay: volDisplay }), /*#__PURE__*/

    React.createElement(PlayHistory, { onClick: () => setPlayHistory(prev => !prev) }))));






}

ReactDOM.render( /*#__PURE__*/React.createElement(DrumMachine, null), document.getElementById('root'));