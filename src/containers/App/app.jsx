import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Players from 'containers/Players';
import Scoreboard from '../Scoreboard';

import styles from './app.css';


/*
 * Main Game logic and states
 * --------------------------
 */

class App extends React.Component {

  constructor() {
    super();
    // Bind class methods
    this.restartGame     = this.restartGame.bind(this);
  }

  restartGame() {
    // Clean players targets and score
    const players = this.state.players.map(p => ( { ...p, ...this.getCleanStats() }));
    // Reset game state
    this.setState({
      players,
      gameState: 'new',
      winnerID: null,
      leaderID: null,
    });
  }

  render() {
    const isNewGame = (this.props.status === 'new');
    return (
      <div className={styles.container}>
        {
          (isNewGame) ? <Players /> : <Scoreboard />
        }
      </div>
    );
  }
}

App.propTypes = {
  status: PropTypes.oneOf(['new', 'on', 'over']),
};

const mapStoreToProps = state => ({
  status: state.game.status,
});

export default connect(mapStoreToProps)(App);
