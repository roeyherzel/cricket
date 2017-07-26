import styles from './players.css';

import React from 'react';
import PropTypes from 'prop-types';

import Manage from './components/Manage';
import Add from './components/Add';

export default function Players(props) {
  return (
    <div className={styles.container}>
      <Add handleAdd={props.addPlayer} />
      <div className={styles.list}>
        {
          props.players.map(p => (
            <Manage
              key={p.id}
              id={p.id}
              name={p.name}
              updatePlayer={props.updatePlayer}
              removePlayer={props.removePlayer}
            />))
        }
      </div>
    </div>
  );
}

Players.propTypes = {
  players: PropTypes.array.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
};
