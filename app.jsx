import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [newNumber, setNewNumber] = useState(false);

  const numberClick = (num) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const operatorClick = (op) => {
    setPrevious(Number(display));
    setOperator(op);
    setNewNumber(true);
  };

  const calculate = () => {
    if (previous === null || operator === null) return;

    const current = Number(display);
    let answer = 0;

    switch (operator) {
      case "+":
        answer = previous + current;
        break;

      case "-":
        answer = previous - current;
        break;

      case "×":
        answer = previous * current;
        break;

      case "÷":
        if (current === 0) {
          setDisplay("Error");
          setPrevious(null);
          setOperator(null);
          return;
        }
        answer = previous / current;
        break;

      default:
        return;
    }

    setDisplay(String(answer));
    setPrevious(null);
    setOperator(null);
    setNewNumber(true);
  };

  const clearAll = () => {
    setDisplay("0");
    setPrevious(null);
    setOperator(null);
    setNewNumber(false);
  };

  const deleteNumber = () => {
    if (newNumber || display === "Error") {
      setDisplay("0");
      setNewNumber(false);
      return;
    }

    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const decimalClick = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  return (
    <div className="app">
      <div className="calculator">

        {/* Display */}
        <div className="display">
          {display}
        </div>

        {/* Buttons */}
        <div className="buttons">

          <button className="special" onClick={clearAll}>
            AC
          </button>

          <button className="special" onClick={deleteNumber}>
            DEL
          </button>

          <button
            className="operator"
            onClick={() => operatorClick("÷")}
          >
            ÷
          </button>

          <button
            className="operator"
            onClick={() => operatorClick("×")}
          >
            ×
          </button>

          <button onClick={() => numberClick("7")}>7</button>
          <button onClick={() => numberClick("8")}>8</button>
          <button onClick={() => numberClick("9")}>9</button>

          <button
            className="operator"
            onClick={() => operatorClick("-")}
          >
            −
          </button>

          <button onClick={() => numberClick("4")}>4</button>
          <button onClick={() => numberClick("5")}>5</button>
          <button onClick={() => numberClick("6")}>6</button>

          <button
            className="operator"
            onClick={() => operatorClick("+")}
          >
            +
          </button>

          <button onClick={() => numberClick("1")}>1</button>
          <button onClick={() => numberClick("2")}>2</button>
          <button onClick={() => numberClick("3")}>3</button>

          <button className="equal" onClick={calculate}>
            =
          </button>

          <button className="zero" onClick={() => numberClick("0")}>
            0
          </button>

          <button onClick={decimalClick}>.</button>

        </div>
      </div>
    </div>
  );
}

export default App;