import styles from './scoreboard.css';

import React from 'react';
import PropTypes from 'prop-types';

import Player from './components/Player';
import Target from './components/Target';


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
    <div>
      <div className={styles.scoreboard}>
        {players}
      </div>
    </div>
  );
}

Scoreboard.propTypes = {
  players: PropTypes.array.isRequired,
  addHit: PropTypes.func.isRequired,
};
