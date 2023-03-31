import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Die from "./components/Die";
import Score from "./components/Score";
import Confetti from "react-confetti";
import "./App.css";

const App = () => {
  const [scoreVal, setScoreVal] = useState(0);
  const [bestVal, setBestVal] = useState(
    localStorage.getItem("bestValue") || 0
  );
  const [dice, setDice] = useState(() => diceInit());
  const [chosenVal, setChosenVal] = useState(() => "");
  const [tenzies, setTenzies] = useState(false);

  function diceInit() {
    return Array.from({ length: 10 }).map((_) => ({
      id: nanoid(),
      rollValue: rollDie(),
      isHeld: false,
    }));
  }

  function rollDie() {
    return Math.ceil(Math.random() * 6);
  }

  function holdValue(event, id) {
    event.stopPropagation();
    if (!chosenVal) {
      setChosenVal(+event.target.textContent);
      // console.log(event);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return id === die.id ? { ...die, isHeld: true } : die;
        })
      );
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return id === die.id && chosenVal === die.rollValue
            ? { ...die, isHeld: true }
            : die;
        })
      );
    }
  }
  // console.log(tenzies);

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

    setScoreVal((prevVal) => (prevVal = prevVal + 1));
  }

  function resetGame() {
    setScoreVal(0);
    setDice(diceInit());
    setChosenVal("");
    setTenzies(false);
  }

  useEffect(() => {
    if (dice.every((die) => die.isHeld && die.rollValue === chosenVal))
      setTenzies(true);
  }, [dice]);

  return (
    <>
      {tenzies && <Confetti />}
      <div className='App'>
        <Score className='best--score' title='Best Score' value={bestVal} />
        <Score
          className='current--score'
          title='Current Score'
          value={scoreVal}
        />

        <div className='game--container'>
          <h1 className='game--title'>Tenzies</h1>
          <p className='game--instructions'>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls
          </p>

          <div className='dice--container'>{allDies}</div>

          <button
            className='btn__game-action'
            onClick={!tenzies ? rollAll : resetGame}
          >
            {!tenzies ? "Roll" : "Reset Game"}
          </button>
        </div>
      </div>
    </>
  );
};

export default App;

