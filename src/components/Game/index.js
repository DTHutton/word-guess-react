import React from "react";
import { wordbank } from "./wordbank";
import "./index.css";

// game arrays
const wordToGuess = [];
const incorrectLetters = [];
const incorrectGuesses = [];
const correctGuesses = [];
let gamesWon;
let gamesLost;

// word and category arrays
const { programs, platforms, accounts } = wordbank;
const categoriesArr = [programs, platforms, accounts];
const categoriesArrTitle = [
  Object.keys({ programs })[0],
  Object.keys({ platforms })[0],
  Object.keys({ accounts })[0]
];
let catNum;
let category;
let word;

//select category and select word from selected category
const gameStart = () => {
  catNum = Math.floor(Math.random() * categoriesArrTitle.length);
  category =
    categoriesArrTitle[catNum].charAt(0).toUpperCase() +
    categoriesArrTitle[catNum].slice(1);
  word =
    categoriesArr[catNum][Math.floor(Math.random() * categoriesArr.length)];

  // generate underscores for game
  for (const letter of word) {
    console.log(letter);
    if (letter === " ") {
      wordToGuess.push(" | ")
    } else {
      wordToGuess.push(" _")
    }
  }
  console.log(wordToGuess);
};

const handleOnKeyUp = event => {
  let guess = event.key;
  let keyVal = word.indexOf(guess);
  if (keyVal > -1) {
    correctGuesses.push(guess);
    console.log(correctGuesses);
  }
}

gameStart();

export default function Game() {
  return (
    <div className="project-game" tabIndex={-1} onKeyUp={handleOnKeyUp}>
      <section className="counter">
        <h2 id="win-count" className="counter-text">
          Wins: {gamesWon}
        </h2>
        <h2 id="loss-count" className="counter-text">
          Losses: {gamesLost}
        </h2>
      </section>

      <section className="currentWord">
        <div id="randCategory">Category: {category}</div>
        <div id="randWord">Current Word: {wordToGuess}</div>
      </section>

      <section className="boxOfShame">
        <div id="incLetters">Incorrect Letters: {incorrectLetters}</div>
        <div className="incorrectCount">Incorrect Guesses: {incorrectGuesses} of 6</div>
      </section>
    </div>
  );
}
