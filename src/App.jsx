import Die from "./components/Die";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [dice, setDice] = useState(() =>
    Array.from({ length: 10 }).map((_, i) => {
      return { id: i, rollValue: rollDie(), isHeld: false };
    })
  );

  function rollDie() {
    return Math.ceil(Math.random() * 6);
  }

  function holdValue(event, id) {
    event.stopPropagation();
    console.log("Clicked", id);
  }

  const allDies = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      num={die.rollValue}
      handleClick={holdValue}
    />
  ));
  // console.log(dice);

  return (
    <div className="App">
      <div className="game--container">
        <h1 className="game--title">Tenzies</h1>
        <p className="game--instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls
        </p>

        <div className="dice--container">{allDies}</div>

        <button className="btn__game-action">Roll</button>
      </div>
    </div>
  );
};

export default App;
