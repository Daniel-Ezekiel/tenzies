import { useEffect, useState } from "react";
import Die from "./components/Die";
// import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import "./App.css";

const App = () => {
  function diceInit() {
    return Array.from({ length: 10 }).map((_, i) => {
      return { id: i, rollValue: rollDie(), isHeld: false };
    });
  }

  function rollDie() {
    return Math.ceil(Math.random() * 6);
  }

  const [dice, setDice] = useState(() => diceInit());
  const [chosenVal, setChosenVal] = useState(() => "");
  const [allHeld, setAllHeld] = useState(false);

  function holdValue(event, id) {
    event.stopPropagation();
    if (!chosenVal) setChosenVal(dice[id].rollValue);
    if (dice.every((die) => die.isHeld)) setAllHeld(true);

    setDice((oldDice) =>
      oldDice.map((die) => {
        return id === die.id && chosenVal === die.rollValue
          ? { ...die, isHeld: true }
          : die;
      })
    );
  }

  const allDies = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      num={die.rollValue}
      isHeld={die.isHeld}
      handleClick={holdValue}
    />
  ));

  function rollAll() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : { ...die, rollValue: rollDie() };
      })
    );
  }

  function resetGame() {
    setDice(diceInit());
    setChosenVal("");
    setAllHeld(false);
  }

  return (
    <div className="App">
      {allHeld && <Confetti />}
      <div className="game--container">
        <h1 className="game--title">Tenzies</h1>
        <p className="game--instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls
        </p>

        <div className="dice--container">{allDies}</div>

        <button
          className="btn__game-action"
          onClick={!allHeld ? rollAll : resetGame}
        >
          {!allHeld ? "Roll" : "Reset Game"}
        </button>
      </div>
    </div>
  );
};

export default App;
