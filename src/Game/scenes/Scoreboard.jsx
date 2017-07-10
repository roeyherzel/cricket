import React from "react";
import "./styles.scss";

export default function Scoreboard(props) {
  const players = props.players.map(player => (
    <Player
      key={player.id}
      {...player}
      onAddHit={props.onAddHit}
    />
    ),
  );

  return (
    <div id="scoreboard">
      {players}
    </div>
  );
}

function Player(props) {
  const targets = props.targets.map((t) => {
    const hitHandler = () => props.onAddHit(props.id, t.number);

    return (
      <Target
        key={t.number}
        hits={t.hits}
        addHit={hitHandler}
      />
    );
  });

  return (
    <div className="player">
      <div className="info">
        <div className="score">{props.score}</div>
        <div className="avatar" />
        <div className="name">{props.name}</div>
      </div>
      <div className="targets">
        {targets}
      </div>
    </div>
  );
}

function Target(props) {
  return (
    <div className="target">
      <button onClick={props.addHit} className="hits">{props.hits}</button>
    </div>
  );
}
