import React from "react";

export default function Target(props) {
  const gameOff = (props.gameStatus !== "running");

  return (
    <div className="target">
      <button
        type="button"
        onClick={() => props.handleHit(props.number, +1)}
        disabled={gameOff}
      >+
      </button>
      <div className="hits">
        {props.hits}
      </div>

      <button
        type="button"
        onClick={() => props.handleHit(props.number, -1)}
        disabled={gameOff}
      >-
      </button>
    </div>
  );
}
