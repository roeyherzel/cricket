import React from 'react';

import Players from 'Players';
import Scoreboard from 'Scoreboard';
import Alert from 'common/components/Alert';
import defs from 'utils/defs';

import DartboardSVG from 'images/dartboard.inline.svg';
import styles from './app.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.isGameStatus      = this.isGameStatus.bind(this);
    this.newGame           = this.newGame.bind(this);
    this.startGame         = this.startGame.bind(this);
    this.addPlayer         = this.addPlayer.bind(this);
    this.removePlayer      = this.removePlayer.bind(this);
    this.updatePlayer      = this.updatePlayer.bind(this);
    this.findPlayerIndex   = this.findPlayerIndex.bind(this);
    this.updateHit         = this.updateHit.bind(this);
    this.targetIDs = ['20', '19', '18', '17', '16', '15', 'B'];
    this.playerIDs = 0;
    this.maxPlayers = 4;
    this.state = {
      gameState: 'new',
      winner: null,
      leader: null,
      players: [],
      alert: '',
    };
  }

  addPlayer(name) {
    this.setState(prevState => {
      // validate name
      if (name === '' || name === 0 || !name) {
        return { alert: `invalid player name (${name})` };
      }
      // validate players count
      const players = prevState.players.slice();
      if (players.length === this.maxPlayers) {
        return { alert: `cannot add player, reached max-players (${this.maxPlayers})` };
      } else if (players.length > 0) {
        // check if name already exists
        const found = players.find(p => (p.name.toLowerCase() === name.toLowerCase()));
        if (found !== undefined) {
          return { alert: `player name already exists (${name})` };
        }
      }
      // pass validations adding player
      players.push({
        id: this.playerIDs++,
        name: name,
        score: 0,
        targets: this.targetIDs.map(t => ({ id: t, hitCount: 0 })),
      });
      return { players, alert: '' };
    });
  }

  findPlayerIndex(playerId, players) {
    const index = players.findIndex(p => p.id === playerId);
    if (index === -1) {
      throw new Error(`didn\'t find playerId (${playerId})`);
    }
    return index;
  }

  updatePlayer(playerId, newName) {
    this.setState(prevState => {
      const players = prevState.players.slice();
      const idx = this.findPlayerIndex(playerId, players);
      players[idx].name = newName;
      return {players};
    });
  }

  removePlayer(playerId) {
    this.setState(prevState => {
      const players = prevState.players.slice();
      const idx = this.findPlayerIndex(playerId, players);
      players.splice(idx, 1);
      return {players};
    });
  }

  updateHit(playerID, targetId, amount = 1) {
    // Update players target hit count and score
    this.setState(prevState => {
      // Get prev state and cache indexes
      const players   = prevState.players.slice();
      const playerIdx = this.findPlayerIndex(playerID, players);
      const targetIdx = players[playerIdx].targets.findIndex(t => t.id === targetId);
      const hitCount  = players[playerIdx].targets[targetIdx].hitCount;

      // Validate hit count
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
      // Update target and score
      players[playerIdx].targets[targetIdx].hitCount += amount;
      players[playerIdx].score += amount;

      // Prepare new state object
      const newState = {players};

      // Update leading player
      const leadingPlayer = players.reduce((prev, curr, idx, arr) => (curr.score > prev.score) ? curr : prev);
      newState.leader = leadingPlayer;

      // Do we have a winner?
      if (players[playerIdx].score === 21) {
        newState.gameState = 'over';
        newState.winner = playerID;
      }
      return newState;
    });
  }

  startGame() {
    if (this.state.players.length === 0) {
      this.setState({alert: 'cannot start game, need at least 1 player'});
    } else {
      this.setState({alert: '', gameState: 'on'});
    }
  }

  newGame() {
    this.setState({gameState: 'new'});
  }

  isGameStatus(status) {
    return (this.state.gameState === status);
  }

  componentDidMount() {
    defs.DEMO_PLAYERS.forEach(name => this.addPlayer(name));
  }

  render() {
    return (
      <div className={styles.app}>
        <header>
          <h1 className={styles.title}>Cricket Darts</h1>
          {
            (this.isGameStatus('new')) ? (
              <button type="button" onClick={this.startGame}>Start Game</button>
            ) : (
              <button type="button" onClick={this.newGame}>New Game</button>
            )
          }
        </header>
        <main>
          <Alert message={this.state.alert} />
          {
            (this.isGameStatus('new')) ? (
              <Players
                players={this.state.players}
                updatePlayer={this.updatePlayer}
                removePlayer={this.removePlayer}
                addPlayer={this.addPlayer}
              />
            ) : (
              <Scoreboard
                targetIDs={this.targetIDs}
                players={this.state.players}
                updateHit={this.updateHit}
              />
            )
          }
        </main>
        <DartboardSVG className={styles.dartboard}/>
        <footer></footer>
      </div>
    );
  }
}
