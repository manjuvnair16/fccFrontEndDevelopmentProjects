const { useState, useEffect } = React;


function Calculator() {
  const [displayNum, setDisplayNum] = useState("");
  const [clickedValue, setClickedValue] = useState("");
  const [clickedGrp, setClickedGrp] = useState("");
  const [clicked, setClicked] = useState(false);
  const [displayFormula, setDisplayFormula] = useState("");
  const [history, setHistory] = useState([]);
  const [historyBtn, setHistoryBtn] = useState(false);
  const [formulaArr, setFormulaArr] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [prevValueClass, setPrevValueClass] = useState("");

  function useEvaluateFormula() {
    let typedFormulaStr = formulaArr.join('');
    let regexHasMoreOperators = /[\+\-\*\/]{3,}/g;
    let regexHasTwoOperators = /[\+\-\*\/][\*\/]/g;
    let regexHasOperatorsAtEnd = /[\+\-\*\/]+$/;

    typedFormulaStr = regexHasOperatorsAtEnd.test(typedFormulaStr) ? typedFormulaStr.replace(regexHasOperatorsAtEnd, "") : typedFormulaStr;

    if (regexHasMoreOperators.test(typedFormulaStr)) {
      typedFormulaStr = typedFormulaStr.replace(/[\+\-\*\/]+([\+\-\*\/])/g, '$1');
    } else if (regexHasTwoOperators.test(typedFormulaStr)) {
      typedFormulaStr = typedFormulaStr.replace(/[\+\-\*\/]([\*\/])/g, '$1');
    }
    const ans = Math.round(1000000000000 * math.evaluate(typedFormulaStr)) / 1000000000000;
    let currEqn = typedFormulaStr + "=" + ans;
    currEqn = currEqn.replace(/\*/g, 'x');
    let newEqnArr = [].concat(currEqn);
    setHistory(newEqnArr.concat(history));
    console.log(history);
    return ans.toString();
  }

  function useCheckMaxLimit() {
    let maxLimit = displayFormula.length > 30 ? (setDisplayNum("Max Limit"), setDisableBtn(true), true) : false;
    return maxLimit;
  }



  useEffect(() => {
    switch (clickedGrp) {
      case "numbers":
        if (!useCheckMaxLimit()) {
          if (displayNum === "0" && clickedValue === "0" || prevValueClass === "answer") {
            setDisplayNum(displayNum);
            return;
          }

          if (prevValueClass === "operators" || prevValueClass === "") {
            setDisplayNum(clickedValue);
          } else {
            setDisplayNum(displayNum + clickedValue);
          }
          setPrevValueClass(clickedGrp);
          setDisplayFormula(displayFormula + clickedValue);
          setFormulaArr([...formulaArr].concat(parseInt(clickedValue, 10)));
        }
        return;

      case "operators":
        if (!useCheckMaxLimit()) {
          if (prevValueClass === "" && (clickedValue === "x" || clickedValue === "/")) {
            return;
          }
          if (prevValueClass === "operators" && displayFormula.length === 1) {
            return;
          }
          if (prevValueClass === "operators") {
            if (/[\+\-\x\/]-$/.test(displayFormula)) {
              setDisplayFormula(displayFormula.slice(0, -2) + clickedValue);
            } else if (clickedValue !== "-") {
              setDisplayFormula(displayFormula.slice(0, -1) + clickedValue);
            } else {
              setDisplayFormula(displayFormula + clickedValue);
            }
          } else {
            setDisplayFormula(displayFormula + clickedValue);
          }
          setDisplayNum(clickedValue);
          setPrevValueClass(clickedGrp);

          if (clickedValue === "x") {
            setFormulaArr([...formulaArr].concat('*'));
          } else {
            setFormulaArr([...formulaArr].concat(clickedValue));
          }

        }
        return;

      case "decimal-point":
        if (!useCheckMaxLimit()) {
          if (prevValueClass === "answer" || displayNum.includes(".")) {
            setDisplayNum(displayNum);
            return;
          }
          if (prevValueClass !== "numbers" && prevValueClass !== "decimal-point") {
            setDisplayNum("0" + clickedValue);
            setDisplayFormula(displayFormula + "0" + clickedValue);
            setFormulaArr([...formulaArr].concat("0" + clickedValue));
          } else {
            setDisplayNum(displayNum + clickedValue);
            setDisplayFormula(displayFormula + clickedValue);
            setFormulaArr([...formulaArr].concat(clickedValue));
          }
          setPrevValueClass(clickedGrp);
        }
        return;

      case "equals-to":
        if (prevValueClass !== "answer" && prevValueClass !== "") {
          setDisplayFormula(displayFormula + clickedValue);
          setDisableBtn(false);
          const answer = useEvaluateFormula();
          setDisplayFormula(answer);
          setDisplayNum(answer);
          setPrevValueClass("answer");
          setFormulaArr(answer);
        }
        return;

      case "all-clear":
        setDisplayNum("0");
        setPrevValueClass("");
        setFormulaArr([]);
        setDisplayFormula("");
        setDisableBtn(false);
        return;

      case "calc-history":

      case "far fa-clock":
        setHistoryBtn(true);
        return;

      case "clr-history":
      case "fas fa-times fa-sm":
        setHistoryBtn(false);
        return;}



  }, [clicked]);


  return /*#__PURE__*/(

    React.createElement("div", { class: "main" }, /*#__PURE__*/
    React.createElement(CalcKeys, { displayNum: displayNum,
      displayFormula: displayFormula,
      disableBtn: disableBtn,
      historyBtn: historyBtn,
      history: history,
      onClick: (value, grp) => {setClickedValue(value);setClickedGrp(grp);setClicked(prev => !prev);} })));




}

function CalcKeys(props) {
  const clickProp = e => props.onClick(e.target.value, e.target.className);
  const showHistoryStyle = props.historyBtn ? { display: "block" } : { display: "none" };
  const calcOpacityStyle = props.historyBtn ? { opacity: 0.4 } : {};
  const displayHistory = props.history.map(eqn => {
    return /*#__PURE__*/(
      React.createElement("ul", null, /*#__PURE__*/
      React.createElement("li", null, eqn)));


  });

  return /*#__PURE__*/(
    React.createElement("div", { class: "wrapper" }, /*#__PURE__*/
    React.createElement("div", { id: "history-div", style: showHistoryStyle }, /*#__PURE__*/
    React.createElement("button", { id: "close-history", className: "clr-history", value: "close", onClick: clickProp }, /*#__PURE__*/React.createElement("i", { class: "fas fa-times fa-sm" })), "History:",
    displayHistory), /*#__PURE__*/

    React.createElement("div", { class: "container", style: calcOpacityStyle }, /*#__PURE__*/
    React.createElement("div", { class: "display-scrn" }, /*#__PURE__*/
    React.createElement("div", { id: "display-formula" }, props.displayFormula), /*#__PURE__*/
    React.createElement("div", { id: "display" }, props.displayNum)), /*#__PURE__*/


    React.createElement("button", { id: "history", className: "calc-history", value: "history", onClick: clickProp }, /*#__PURE__*/React.createElement("i", { class: "far fa-clock" })), /*#__PURE__*/

    React.createElement("button", { id: "clear", className: "all-clear", value: "0", onClick: clickProp }, "AC"), /*#__PURE__*/
    React.createElement("button", { id: "add", className: "operators", value: "+", disabled: props.disableBtn, onClick: clickProp }, "+"), /*#__PURE__*/

    React.createElement("button", { id: "seven", className: "numbers", value: "7", disabled: props.disableBtn, onClick: clickProp }, "7"), /*#__PURE__*/
    React.createElement("button", { id: "eight", className: "numbers", value: "8", disabled: props.disableBtn, onClick: clickProp }, "8"), /*#__PURE__*/
    React.createElement("button", { id: "nine", className: "numbers", value: "9", disabled: props.disableBtn, onClick: clickProp }, "9"), /*#__PURE__*/
    React.createElement("button", { id: "subtract", className: "operators", value: "-", disabled: props.disableBtn, onClick: clickProp }, "\u2013"), /*#__PURE__*/

    React.createElement("button", { id: "four", className: "numbers", value: "4", disabled: props.disableBtn, onClick: clickProp }, "4"), /*#__PURE__*/
    React.createElement("button", { id: "five", className: "numbers", value: "5", disabled: props.disableBtn, onClick: clickProp }, "5"), /*#__PURE__*/
    React.createElement("button", { id: "six", className: "numbers", value: "6", disabled: props.disableBtn, onClick: clickProp }, "6"), /*#__PURE__*/
    React.createElement("button", { id: "multiply", className: "operators", value: "x", disabled: props.disableBtn, onClick: clickProp }, "x"), /*#__PURE__*/

    React.createElement("button", { id: "one", className: "numbers", value: "1", disabled: props.disableBtn, onClick: clickProp }, "1"), /*#__PURE__*/
    React.createElement("button", { id: "two", className: "numbers", value: "2", disabled: props.disableBtn, onClick: clickProp }, "2"), /*#__PURE__*/
    React.createElement("button", { id: "three", className: "numbers", value: "3", disabled: props.disableBtn, onClick: clickProp }, "3"), /*#__PURE__*/
    React.createElement("button", { id: "divide", className: "operators", value: "/", disabled: props.disableBtn, onClick: clickProp }, "/"), /*#__PURE__*/

    React.createElement("button", { id: "zero", className: "numbers", value: "0", disabled: props.disableBtn, onClick: clickProp }, "0"), /*#__PURE__*/
    React.createElement("button", { id: "decimal", className: "decimal-point", value: ".", disabled: props.disableBtn, onClick: clickProp }, "."), /*#__PURE__*/
    React.createElement("button", { id: "equals", className: "equals-to", value: "=", onClick: clickProp }, "="))));




}



ReactDOM.render( /*#__PURE__*/React.createElement(Calculator, null), document.getElementById("root"));