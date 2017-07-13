import styles from './styles.scss';

import React from 'react';
import Player from './components/Player';
import Target from './components/Target';

export default function Scoreboard(props) {

  const Players = props.players.map(p => {
    return (
      <Player key={p.id} {...p}>
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
    <div className={styles.scoreboard}>{Players}</div>
  );
}