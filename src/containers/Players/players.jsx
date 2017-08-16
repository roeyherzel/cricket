import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPlayer, deletePlayer, editPlayer, loadDemoPlayers } from 'actions/playerActions';
import { startGame } from 'actions/gameActions';

import Header from 'common/components/header';
import PlayerList from 'components/PlayerList';
import PlayerItem from 'components/PlayerItem';
import AddPlayer from 'components/AddPlayer';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import DartboardSVG from 'images/dartboard.inline.svg';
import styles from './players.css';


function Players(props) {
  return (
    <div>
      <Header />
      <main>
        <Paper className={styles.container}>

          <AddPlayer handleAdd={props.handleAdd} />
          <PlayerList>
            {
              props.players.map(p => (
                <PlayerItem
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  handleEdit={props.handleEdit}
                  handleDelete={props.handleDelete}
                />
              ))
            }
          </PlayerList>

          {
            (props.players.length > 0) ? (
              <RaisedButton
                className={styles.startGameBtn}
                label="start game"
                onClick={props.handleStartGame}
                secondary={true}
              />
            ) : (
              <div className={styles.noplayers}>
                <RaisedButton
                  className={styles.demoBtn}
                  label="demo players"
                  onClick={props.handleDemoPlayers}
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

Players.propTypes = {
  players: PropTypes.array.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleStartGame: PropTypes.func.isRequired,
  handleDemoPlayers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  players: state.players,
});

export default connect(
  mapStateToProps,
  {
    handleAdd: addPlayer,
    handleEdit: editPlayer,
    handleDelete: deletePlayer,
    handleStartGame: startGame,
    handleDemoPlayers: loadDemoPlayers,
  }
)(Players);
