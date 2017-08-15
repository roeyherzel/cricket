import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPlayer, editPlayer, deletePlayer, startGame } from 'actions';

import Header from 'common/components/header';
import PlayerList from 'components/PlayerList';
import PlayerItem from 'components/PlayerItem';
import AddPlayer from 'components/AddPlayer';

import DartboardSVG from 'images/dartboard.inline.svg';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
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
                  onClick={this.loadDemoPlayers}
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

  // loadDemoPlayers: PropTypes.func.isRequired,
  // startGame: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    players: state.players,
  };
};

const mapDispatchToProps = dispatch => ({
  onAdd: name => dispatch(addPlayer(name)),
  onDelete: id => dispatch(deletePlayer(id)),
  onEdit: (id, name) => dispatch(editPlayer(id, name)),
  onStartGame: () => dispatch(startGame()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Players);
