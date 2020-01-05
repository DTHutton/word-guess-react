import React from 'react'
import './index.css'

export default function Title () {
  return (
    <div className="project-title">
      <h1 className="banner">Word Guess</h1>
      <h3 className="howTo">
        The classic hangman game except you don&apos;t brutally murder an innocent
        stick figure.
      </h3>
      <h6>He&apos;s guilty af</h6>
      {/* <div className="counter">
        <h2 className="win-count">Wins: 0</h2>
        <h2 className="loss-count">Losses: 0</h2>
      </div> */}
    </div>
  )
}
