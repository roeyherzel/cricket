import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from 'actions';

import Header from 'common/components/header';
import PlayerList from 'components/PlayerList';
import PlayerItem from 'components/PlayerItem';
import AddPlayer from 'components/AddPlayer';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import DartboardSVG from 'images/dartboard.inline.svg';
import styles from './players.css';

/*
 * PlayersDetails view
 * -------------------
 * - render add player widget
 * - render players editable players list
 */

function Players(props) {
  return (
    <div>
      <Header />
      <main>
        <Paper className={styles.container}>

          <AddPlayer onAdd={props.onAdd} />
          <PlayerList>
            {
              props.players.map(p => (
                <PlayerItem
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  onEdit={props.onEdit}
                  onDelete={props.onDelete}
                />
              ))
            }
          </PlayerList>

          {
            (props.players.length > 0) ? (
              <RaisedButton
                className={styles.startGameBtn}
                label="start game"
                onClick={props.onStartGame}
                secondary={true}
              />
            ) : (
              <div className={styles.noplayers}>
                <RaisedButton
                  className={styles.demoBtn}
                  label="demo players"
                  onClick={props.onDemoPlayers}
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
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStartGame: PropTypes.func.isRequired,
  onDemoPlayers: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    players: state.players,
  };
};

export default connect(
  mapStateToProps,
  {
    onAdd: actions.addPlayer,
    onEdit: actions.editPlayer,
    onDelete: actions.deletePlayer,
    onStartGame: actions.startGame,
    onDemoPlayers: actions.loadDemoPlayers,
  }
)(Players);
