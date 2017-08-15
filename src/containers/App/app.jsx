import React from 'react';
import PlayersDetails from '../PlayersDetails';
import Scoreboard from '../Scoreboard';
import defs from 'utils/defs';
import * as utils from 'utils/funcs';
import styles from './app.css';

/*
  Main Game logic and states
  --------------------------
*/
export default class App extends React.Component {
  constructor() {
    super();
    // Bind class methods
    this.restartGame     = this.restartGame.bind(this);
    this.startGame       = this.startGame.bind(this);
    this.addPlayer       = this.addPlayer.bind(this);
    this.removePlayer    = this.removePlayer.bind(this);
    this.updatePlayer    = this.updatePlayer.bind(this);
    this.loadDemoPlayers = this.loadDemoPlayers.bind(this);
    this.getCleanStats   = this.getCleanStats.bind(this);
    this.updateHit       = this.updateHit.bind(this);
    /*
      Non-statefull variables
      -----------------------
    */
    this.targetIDs = ['20', '19', '18', '17', '16', '15', 'B'];
    // Counter for allocating new playerID
    this.playerIDs = 0;
    // Max players per game
    this.maxPlayers = 4;
    /*
      Statefull variables
      -------------------
    */
    this.state = {
      gameState: 'new', // one of new/on/over
      winnerID: null,   // winning playerID
      leaderID: null,   // leading playerID
      players: [],      // players and thier targets
    };
  }

  getCleanStats() {
    // Set players targets hitCount and score to 0
    return {
      score: 0,
      targets: this.targetIDs.map(t => ({ id: t, hitCount: 0 })),
    };
  }

  addPlayer(name) {
    // Validate name and state
    const error = utils.validatePlayerName(name, this.state.players.map(p => p.name));
    if (error) return error;
    // Pass validations adding player
    this.setState(prevState => {
      // Copy players state
      const players = prevState.players.slice();
      // Add player with clean stats
      players.push({
        id: this.playerIDs++,
        name: name,
        ...this.getCleanStats(),
      });
      // Return new state
      return {players};
    });
  }

  updatePlayer(playerId, newName) {
    // Update player's name
    // TODO: validate player newName
    this.setState(prevState => {
      // Copy players state
      const players = prevState.players.slice();
      // Override player's name
      const idx = utils.findPlayerIndex(playerId, players);
      players[idx].name = newName;
      // return new state
      return {players};
    });
  }

  removePlayer(playerId) {
    this.setState(prevState => {
      // Copy players state
      const players = prevState.players.slice();
      // Remove player
      const idx = utils.findPlayerIndex(playerId, players);
      players.splice(idx, 1);
      // return new state
      return {players};
    });
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

  startGame() {
    this.setState({gameState: 'on'});
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

  loadDemoPlayers() {
    defs.DEMO_PLAYERS.forEach(name => this.addPlayer(name));
  }

  render() {
    return (
      <div className={styles.container}>
        {
          (this.state.gameState === 'new') ? (
            <PlayersDetails
              players={this.state.players}
              updatePlayer={this.updatePlayer}
              removePlayer={this.removePlayer}
              addPlayer={this.addPlayer}
              startGame={this.startGame}
              loadDemoPlayers={this.loadDemoPlayers}
            />
          ) : (
            <Scoreboard
              targetIDs={this.targetIDs}
              players={this.state.players}
              updateHit={this.updateHit}
              restartGame={this.restartGame}
              leaderID={this.state.leaderID}
              winnerID={this.state.winnerID}
            />
          )
        }
      </div>
    );
  }
}
