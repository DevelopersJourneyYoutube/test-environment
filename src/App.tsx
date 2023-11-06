import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState<number>(0);

  const myConsoleFunction = (): void => {
    console.log("hello world!");
  };

  const clearConsole = (): void => {
    console.clear();
  };

  const printStyledConsoleStatement = (): void => {
    console.log(
      "%c Danger",
      "color: white; background: red; font-size: x-large;"
    );
  };

  const increamentAndAssert = (): void => {
    setCount((prev): number => {
      const updatedNumber = prev + 1;

      console.assert(
        updatedNumber <= 5,
        `updated number is exceeding 5: ${updatedNumber}`
      );

      return updatedNumber;
    });
  };

  const displayTableInConsole = (): void => {
    console.table([
      { value1: "test", value2: 0 },
      { value1: "best", value2: 4 },
    ]);
  };

  const countTheTimePassed = (): void => {
    console.time();
    const newArray = new Array(100000);
    console.timeEnd();
  };

  const anotherFucntion = (): void => {
    console.trace("hello");
  };

  const runAnotherFunction = (): void => {
    anotherFucntion();
  };

  return (
    <div className="App">
      <button
        type="button"
        title="runs my console function"
        onClick={myConsoleFunction}
      >
        Click me
      </button>
      <button type="reset" title="clear the console" onClick={clearConsole}>
        Reset
      </button>
      {/* Other console statements */}
      <button
        type="button"
        title="console statement with css"
        onClick={printStyledConsoleStatement}
      >
        styled console statement
      </button>
      <button
        type="button"
        title="assert state counter"
        onClick={increamentAndAssert}
      >
        assert the count
      </button>
      <p>Count: {count}</p>

      <button
        title="display a table in console"
        type="button"
        onClick={displayTableInConsole}
      >
        Display a table
      </button>

      <button
        type="button"
        title="count the time passed"
        onClick={countTheTimePassed}
      >
        Get the time passed
      </button>

      <button type="button" title="trace function" onClick={runAnotherFunction}>
        Trace the function
      </button>
    </div>
  );
}

export default App;
