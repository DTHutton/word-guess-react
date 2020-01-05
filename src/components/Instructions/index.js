import React from 'react'
import './index.css'

export default function Instructions () {
  return (
    <div className="project-instructions">
      <h3 className="howTo">
        The classic hangman game except you don't brutally murder an innocent
        stick figure.
      </h3>
      <h6>He's guilty af</h6>
      <div className="breakdown">
        <h2>Instructions</h2>
        <p>
          Guess the word(s) based on the category before you run out of chances
          to win. Every correct letter fills in a blank and every incorrect
          letter goes in the box of shame.
        </p>
      </div>
    </div>
  )
}
