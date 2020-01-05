import React, { useState, useEffect } from "react";
import Scoreboard from "./Scoreboard";
import WordToGuess from "./WordToGuess";
import { wordbank } from "./wordbank";
import './index.css';

export default function Game(props) {
  //? category
  const initCategory =
    wordbank[Math.floor(Math.random() * wordbank.length)].title;
  const [category, setCategory] = useState(initCategory);

  //? word
  const initWord = () => {
    const num = wordbank.findIndex(index => index.title === category);
    const random = Math.floor(Math.random() * wordbank[num].items.length);
    const selected = wordbank[num].items[random];
    return selected;
  };
  const [word, setWord] = useState(initWord);

  //? underscores
  const initUnderscores = word.replace(/./gi, "_").split("");
  const [underscore, setUnderscore] = useState(initUnderscores);

  //? keypress
  const [keyPressed, setKeyPressed] = useState();
  const keyValidate = /[a-z]|[0-9]/gi;
  const handleKeyPress = ({ key }) =>
    key.match(keyValidate) && key !== "Enter"
      ? setKeyPressed(key)
      : alert(`${key} is not valid. Please select a valid alphanumeric key.`);
  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  //? game score
  const [incorrectGuess, setIncorrectGuess] = useState([]);
  const [remainingGuesses, setRemainingGuesses] = useState(6);
  const [gameRegex, setGameRegex] = useState([]);

  useEffect(() => {
    if (word.includes(keyPressed)) {
      gameRegex.push(keyPressed);
      const converter = gameRegex.join().replace(/,/gi, "|");
      const replacer = new RegExp(`[^${converter}]`, "gi");
      const newUnderscore = word.replace(replacer, "_").split("");
      setUnderscore(newUnderscore);
    } else {
      const newIncorrectGuess = [...incorrectGuess, keyPressed];
      setIncorrectGuess(newIncorrectGuess);
      setRemainingGuesses(6 - incorrectGuess.length);
    }
  }, [keyPressed]);

  return (
    <div className="container--game">
      <Scoreboard
        categoryValue={category}
        incorrectGuessValue={incorrectGuess}
        remainingGuessesValue={remainingGuesses}
      />
      <WordToGuess value={underscore} />
    </div>
  );
}
