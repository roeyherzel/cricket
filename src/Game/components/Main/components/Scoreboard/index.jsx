import React from 'react';
import styles from './styles.scss';

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
    <div className={styles.scoreboard}>
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
    <div className={styles.player}>
      <div className={styles.info}>
        <div className={styles.score}>{props.score}</div>
        <div className={styles.avatar} />
        <div className={styles.name}>{props.name}</div>
      </div>
      <div className={styles.targets}>
        {targets}
      </div>
    </div>
  );
}

function Target(props) {
  return (
    <div className={styles.target}>
      <button onClick={props.addHit} className={styles.hits}>{props.hits}</button>
    </div>
  );
}