import React from "react";

export default function Scoreboard(props) {
  return (
    <div className="scoreboard">
      <div className="info-block">
        <div className="info-block__header">Category</div>
        <div className="info-block__content">{props.categoryValue}</div>
      </div>

      <div className="info-block">
        <div className="info-block__header">Incorrect Guesses</div>
        <div className="info-block__content">
          {props.incorrectGuessValue.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__header">Guesses Remaining</div>
        <div className="info-block__content">
          {props.remainingGuessesValue} of 6
        </div>
      </div>
    </div>
  );
}
