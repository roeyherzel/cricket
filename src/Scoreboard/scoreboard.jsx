
import React from 'react';
import PropTypes from 'prop-types';
import Player from './components/Player';
import Target from './components/Target';

import styles from './scoreboard.css';
import dartboardImg from 'images/dartboard.png';

export default function Scoreboard(props) {
  const players = props.players.map(p => {
    const targets = p.targets.map(t => (
      <Target
        key={t.id}
        targetId={t.id}
        playerId={p.id}
        hitCount={t.hitCount}
        addHit={props.addHit} />
    ));
    return (
      <Player
        key={p.id}
        name={p.name}
        score={p.score}
      >
        {targets}
      </Player>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.legend}>
        <div className={styles.info}>
          <img src={dartboardImg} />
        </div>
        <div className={styles.targets}>
          {
            props.targetIDs.map(id => (
              <div className={styles.target}>
                <span>{id}</span>
              </div>
            ))
          }
        </div>
      </div>
      {players}
    </div>
  );
}

Scoreboard.propTypes = {
  targetIDs: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
  addHit: PropTypes.func.isRequired,
};
