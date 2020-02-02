import React, { useState, useEffect } from 'react'
import Scoreboard from './Scoreboard'
import WordToGuess from './WordToGuess'
import { wordbank } from './wordbank'
import './index.css'

export default function Game(props) {
  // ? category selection
  const initCategory = wordbank[Math.floor(Math.random() * wordbank.length)].title
  const [category, setCategory] = useState(initCategory)

  // ? word selection
  function initWord() {
    const categoryIndex = wordbank.findIndex((index) => index.title === category)
    const random = Math.floor(Math.random() * wordbank[categoryIndex].items.length)
    return wordbank[categoryIndex].items[random]
  }
  const [word, setWord] = useState(initWord)

  // ? underscore generation
  const initUnderscore = word.replace(/./gi, '_').split('')
  const [underscore, setUnderscore] = useState(initUnderscore)

  // ? keypress validation and functions
  const [keyPressed, setKeyPressed] = useState()
  const keyValidate = /[a-z]|[0-9]/gi
  function handleKeyPress({ key }) {
    if (key.match(keyValidate) && key !== 'Enter') {
      setKeyPressed(key)
    } else {
      alert(`${key} is not valid. Please select a valid alphanumeric key.`)
    }
  }
  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress)
    return () => {
      window.removeEventListener('keypress', handleKeyPress)
    }
  })

  // ? game score
  const chances = 6
  const [incorrectGuess, setIncorrectGuess] = useState([])
  const [remainingGuesses, setRemainingGuesses] = useState(chances)
  // const [gameRegex, setGameRegex] = useState([])
  const [gameRegex] = useState([])

  useEffect(() => {
    if (word.includes(keyPressed)) {
      /* 
      ! This works, but it's sloppy and gross looking. I've been looking into how to use state and effect hooks properly and 
      ! I don't understand why this works fine, but trying to write it like the setIncorrectGuess line below causes problems. 
      ! It doesn't update the gameRegex state until you press another key what will update it again.
      */
      gameRegex.push(keyPressed)
      //! setGameRegex([...gameRegex, keyPressed])
      //! -----------------------------------------------------------------------------
      // ? converts the array to string and replaces ',' with '|' so it functions as the 'or' operator in RegEX
      const converter = gameRegex.join().replace(/,/gi, '|')
      const replacer = new RegExp(`[^${converter}]`, 'gi')
      const newUnderscore = word.replace(replacer, '_').split('')
      setUnderscore(newUnderscore)
    }
    if (!word.includes(keyPressed) && !incorrectGuess.includes(keyPressed)) {
      // const newIncorrectGuess = [...incorrectGuess, keyPressed]
      // setIncorrectGuess(newIncorrectGuess)
      setIncorrectGuess([...incorrectGuess, keyPressed])
      setRemainingGuesses(chances - incorrectGuess.length)
    }
    /* 
    ! This warning is returned by React when the app reneders. 
    ! Adding the missing dependencies causes an infinite render loop.
    * --------------------------------------------------------------
    ./src/components/Game/index.js
    Line 58:6:  React Hook useEffect has missing dependencies: 'gameRegex', 'incorrectGuess', and 'word'.
    Either include them or remove the dependency array. You can also do a functional update 'setIncorrectGuess(i => ...)'
    if you only need 'incorrectGuess' in the 'setIncorrectGuess' call  react-hooks/exhaustive-deps
    */
  }, [keyPressed])

  // ? game win
  useEffect(() => {
    if (!underscore.includes('_')) {
      alert('Winner!!!')
      setCategory(initCategory)
      setWord(initWord)
      setUnderscore(initUnderscore)
      setIncorrectGuess([])
      setRemainingGuesses(chances)
    }
    if (!remainingGuesses) {
      alert(`Better luck next time! The word was: ${word}.`)
      setCategory(initCategory)
      setWord(initWord)
      setUnderscore(initUnderscore)
      setIncorrectGuess([])
      setRemainingGuesses(chances)
    }
  })

  return (
    <div className="container--game">
      <Scoreboard
        categoryValue={category}
        incorrectGuessValue={incorrectGuess}
        remainingGuessesValue={remainingGuesses}
      />
      <WordToGuess value={underscore} />
    </div>
  )
}
