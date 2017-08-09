import React from 'react';
import PropTypes from 'prop-types';
import Header from 'common/components/header';
import List from './components/List';
import Edit from './components/Edit';
import Add from './components/Add';
import DartboardSVG from 'images/dartboard.inline.svg';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './playersDetails.css';

/*
  PlayersDetails view
  -------------------
  - render add player widget
  - render players editable players list
*/
export default function PlayersDetails(props) {
  return (
    <div>
      <Header />
      <main>
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
                />
              ))
            }
          </List>

          {
            (props.players.length > 0) ? (
              <RaisedButton
                className={styles.startGameBtn}
                label="start game"
                onClick={props.startGame}
                secondary={true}
              />
            ) : (
              <div className={styles.noplayers}>
                <RaisedButton
                  className={styles.demoBtn}
                  label="demo players"
                  onClick={props.loadDemoPlayers}
                  secondary={true}
                />
                <DartboardSVG className={styles.dartboardSVG} />
              </div>
            )
          }

        </Paper>
      </main>
    </div>
  );
}

PlayersDetails.propTypes = {
  players: PropTypes.array.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
  loadDemoPlayers: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};
