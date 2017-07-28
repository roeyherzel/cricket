import React from 'react';
import PropTypes from 'prop-types';
import ManagePlayer from './components/ManagePlayer';
import AddPlayer from './components/AddPlayer';

import RaisedButton from 'material-ui/RaisedButton';

import styles from './playersDetails.css';

export default function PlayersDetails(props) {
  return (
    <div className={styles.container}>
      <AddPlayer handleAdd={props.addPlayer} />
      <div className={styles.list}>
        {
          props.players.map(p => (
            <ManagePlayer
              key={p.id}
              id={p.id}
              name={p.name}
              updatePlayer={props.updatePlayer}
              removePlayer={props.removePlayer}
            />))
        }
      </div>
      <RaisedButton label="Start Game" primary={true} onClick={props.startGame}/>
    </div>
  );
}

PlayersDetails.propTypes = {
  players: PropTypes.array.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};
