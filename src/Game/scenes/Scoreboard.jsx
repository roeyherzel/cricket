import React from "react";
import "./styles.scss";

export default function Scoreboard(props) {
  const players = props.players.map(player => (
    <Player
      key={player.id}
      name={player.name}
      score={player.score}
      targets={player.targets}
    />
  ));

  return (
    <div id="scoreboard">
      {/* <Numbers numbers={props.numbers} />*/}
      {players}
    </div>
  );
}

function Player(props) {
  const targets = props.targets.map(t => (
    <Target key={t.number} hits={t.hits} />
  ));

  return (
    <div className="player">
      <div className="targets">
        {targets}
      </div>
      <div className="info">
        <div className="avatar" />
        <div className="name">{props.name}</div>
        <div className="score">{props.score}</div>
      </div>
    </div>
  );
}

function Target(props) {
  return (
    <div className="target">
      <button className="hits">{props.hits}</button>
    </div>
  );
}

function Numbers(props) {
  return (
    <div id="numbers">
      {
        props.numbers.map(num => <div key={num}>{num}</div>)
      }
    </div>
  );
}
