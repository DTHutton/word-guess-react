import React from 'react'

export default function WordToGuess (props) {
  return (
    <div className="game">
      <div className="game__header">Word to Guess</div>
      <ul className="game__content">
        {props.value.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
