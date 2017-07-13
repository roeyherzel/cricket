import styles from './players.scss';

import React from 'react';
import PropTypes from 'prop-types';

import defs from 'utils/defs';
import Header from 'components/Header';
import Edit from './components/Edit';
import Add from './components/Add';

export default function Players(props) {
  const isNew = (props.gameState === 'new');
  return (
    <div>
      <Header>
        {
          (isNew) ? (
            <button>Start</button>
          ) : (
            <button>Restart</button>
          )
        }
      </Header>
      <div className={styles.players}>
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

Players.propTypes = {
  gameState: PropTypes.oneOf(defs.GAME_STATES).isRequired,
  players: PropTypes.array.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
};