import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Players from 'containers/Players';
import Scoreboard from '../Scoreboard';

import * as utils from 'utils/funcs';
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
    this.getCleanStats   = this.getCleanStats.bind(this);
    this.updateHit       = this.updateHit.bind(this);
    /*
      Non-statefull variables
      -----------------------
    */
    this.targetIDs = ['20', '19', '18', '17', '16', '15', 'B'];
    // Counter for allocating new playerID
    // Max players per game
    this.maxPlayers = 4;
  }

  getCleanStats() {
    // Set players targets hitCount and score to 0
    return {
      score: 0,
      targets: this.targetIDs.map(t => ({ id: t, hitCount: 0 })),
    };
  }

  updateHit(playerID, targetId, amount = 1) {
    // Update players target hitCount and score
    this.setState(prevState => {
      // Get prev state and cache indexes
      const players   = prevState.players.slice();
      const playerIdx = utils.findPlayerIndex(playerID, players);
      const targetIdx = players[playerIdx].targets.findIndex(t => t.id === targetId);
      const hitCount  = players[playerIdx].targets[targetIdx].hitCount;

      // on add, exit if target is closed
      if (amount > 0 && hitCount >= 3) {
        console.log('Target is closed');
        return;
      }
      // on remove, exit if target is empty
      if (amount < 0 && hitCount === 0) {
        console.log('Target is empty');
        return;
      }
      // Pass vlidations, update target and score
      players[playerIdx].targets[targetIdx].hitCount += amount;
      players[playerIdx].score += amount;

      // Prepare new state object
      const newState = {players};

      // Update leading player
      const leadingPlayer = players.reduce((prev, curr) => (curr.score > prev.score) ? curr : prev);
      newState.leaderID = leadingPlayer.id;

      // Do we have a ID?
      if (players[playerIdx].score === 21) {
        newState.gameState = 'over';
        newState.winnerID = playerID;
      }
      // Return new state
      return newState;
    });
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
