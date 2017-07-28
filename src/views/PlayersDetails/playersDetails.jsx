import React from 'react';
import PropTypes from 'prop-types';
import List from './components/List';
import Edit from './components/Edit';
import Add from './components/Add';

import RaisedButton from 'material-ui/RaisedButton';

import styles from './playersDetails.css';

export default function PlayersDetails(props) {
  return (
    <div className={styles.container}>
      <List>
        {
          props.players.map(p => (
            <Edit
              key={p.id}
              id={p.id}
              name={p.name}
              updatePlayer={props.updatePlayer}
              removePlayer={props.removePlayer}
            />))
        }
      </List>
      <Add handleAdd={props.addPlayer} />
      {
        (props.players.length > 0) && (
          <RaisedButton
            label="Start Game"
            onClick={props.startGame}
            primary={true}
          />
        )
      }
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
