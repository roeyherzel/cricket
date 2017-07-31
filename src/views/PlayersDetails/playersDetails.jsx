import React from 'react';
import PropTypes from 'prop-types';
import List from './components/List';
import Edit from './components/Edit';
import Add from './components/Add';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './playersDetails.css';

export default function PlayersDetails(props) {
  return (
    <Paper className={styles.container}>
      <Add handleAdd={props.addPlayer} />
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
      {/* {
        (props.players.length > 0) && (
          <RaisedButton label="start game" onClick={props.startGame} secondary={true}/>
        )
      } */}
    </Paper>
  );
}

PlayersDetails.propTypes = {
  players: PropTypes.array.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};
