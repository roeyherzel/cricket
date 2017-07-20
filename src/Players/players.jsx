import styles from './players.css';

import React from 'react';
import PropTypes from 'prop-types';

import List from './components/List';
import Manage from './components/Manage';
import Add from './components/Add';

import Logo from 'common/components/Logo';

export default function Players(props) {
  const players = props.players.map(p => (
    <Manage
      key={p.id}
      id={p.id}
      name={p.name}
      updatePlayer={props.updatePlayer}
      removePlayer={props.removePlayer}
    />
  ));

  return (
    <div className={styles.container}>
      <Add addPlayer={props.addPlayer} />
      {
        (players.length === 0) ? (
          <Logo />
        ) : (
          <List>
            {players}
          </List>
        )
      }
    </div>
  );
}

Players.propTypes = {
  players: PropTypes.array.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
};
