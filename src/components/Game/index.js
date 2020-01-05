import React, { useState, useEffect } from 'react'
import Scoreboard from './Scoreboard'
import WordToGuess from './WordToGuess'
import { wordbank } from './wordbank'
import './index.css'

export default function Game (props) {
  // ? category
  const [category] = useState(wordbank[Math.floor(Math.random() * wordbank.length)].title)

  // ? word
  function initWord() {
    const num = wordbank.findIndex((index) => index.title === category)
    const random = Math.floor(Math.random() * wordbank[num].items.length)
    const selected = wordbank[num].items[random]
    return selected
  }
  const [word] = useState(initWord)

  // ? underscores
  const [underscore, setUnderscore] = useState(word.replace(/./gi, '_').split(''))

  // ? keypress
  const [keyPressed, setKeyPressed] = useState()
  const keyValidate = /[a-z]|[0-9]/gi
  const handleKeyPress = ({ key }) => (key.match(keyValidate) && key !== 'Enter'
    ? setKeyPressed(key)
    : alert(`${key} is not valid. Please select a valid alphanumeric key.`))
  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress)
    return () => {
      window.removeEventListener('keypress', handleKeyPress)
    }
  })

  // ? game score
  const [incorrectGuess, setIncorrectGuess] = useState([])
  const [remainingGuesses, setRemainingGuesses] = useState(6)
  const [gameRegex, setGameRegex] = useState([])

  useEffect(function gamePlay() {
    if (word.includes(keyPressed)) {
      //! this works, but i'm pretty sure it's sloppy. i've been looking into how to use state and effect hooks properly, but i don't understand why this works fine, but trying to write it like the setIncorrectGuess line below causes problems. it doesn't update the gameRegex state until you press another key what will update it again. i tried taking out the state hook and just using a variable set to an empty array, but it clears on re-render everytime even when the re-render is not related to the gameRegex data.
      gameRegex.push(keyPressed) 
      const converter = gameRegex.join().replace(/,/gi, '|')
      const replacer = new RegExp(`[^${converter}]`, 'gi')
      const newUnderscore = word.replace(replacer, '_').split('')
      setUnderscore(newUnderscore)
    } else {
      // const newIncorrectGuess = [...incorrectGuess, keyPressed]
      // setIncorrectGuess(newIncorrectGuess)
      setIncorrectGuess([...incorrectGuess, keyPressed])
      setRemainingGuesses(6 - incorrectGuess.length)
    }
  }, [keyPressed])

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
