import styles from './scoreboard.css';

import React from 'react';
import PropTypes from 'prop-types';

import Header from 'common/components/Header';
import Player from './components/Player';
import Target from './components/Target';



export default function Scoreboard(props) {
  const players = props.players.map(p => {
    return (
      <Player
        key={p.id}
        name={p.name}
        score={p.score}
      >
      {
        p.targets.map(t => (
          <Target
            key={t.id}
            targetId={t.id}
            playerId={p.id}
            hitCount={t.hitCount}
            handleHit={props.handleHit} />
        ))
      }
      </Player>
    );
  });

  return (
    <div>
      <Header>
        <button>Restart Game</button>
      </Header>

      <div className={styles.scoreboard}>
        {players}
      </div>
    </div>
  );
}

Scoreboard.propTypes = {
  players: PropTypes.array.isRequired,
};