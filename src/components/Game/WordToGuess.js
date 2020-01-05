import React from 'react'
import PropTypes from 'prop-types'

WordToGuess.propTypes = {
  value: PropTypes.array
}

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
