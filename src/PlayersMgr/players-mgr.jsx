import styles from './players-mgr.css';

import React from 'react';
import PropTypes from 'prop-types';

import Header from 'common/components/Header';
import Edit from './components/Edit';
import Add from './components/Add';

export default function PlayersMgr(props) {
  return (
    <div>
      <Header>
        <button onClick={props.startGame}>Start Game</button>
      </Header>

      <div className={styles.playersMgr}>
        <div className={styles.playersList}>
          {
            props.players.map(p => (
              <Edit
                key={p.id}
                id={p.id}
                name={p.name}
                updatePlayer={props.updatePlayer}
                removePlayer={props.removePlayer}
              />
            ))
          }
        </div>
        <Add addPlayer={props.addPlayer} />
      </div>
    </div>
  );
}

PlayersMgr.propTypes = {
  players: PropTypes.array.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};