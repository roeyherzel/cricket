import styles from './app.css';

import React from 'react';
import PlayersMgr from 'PlayersMgr';
import Scoreboard from 'Scoreboard';
import defs from 'utils/defs';

export default class App extends React.Component {
  constructor() {
    super();
    this.startGame = this.startGame.bind(this);
    this.initPlayer = this.initPlayer.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.findPlayerIndex = this.findPlayerIndex.bind(this);
    this.addHit = this.addHit.bind(this);
    this.updateTargetScore = this.updateTargetScore.bind(this);
    this.targetIDs = ['20', '19', '18', '17', '16', '15', 'B'];
    this.playerIDs = 0;
    this.maxPlayers = 4;
    this.state = {
      gameState: 'new',
      winner: null,
      players: [],
    };
  }

  initPlayer(player) {
    player.score = 0;
    player.targets = this.targetIDs.map(t => ({ id: t, hitCount: 0 }));
    return player;
  }

  addPlayer(name) {
    // validate max players
    if (this.state.players.length === this.maxPlayers) {
      console.error(`cannot add player, reached max-players (${this.maxPlayers})`);
      return false;
    }
    // validate name
    if (name === '' || name === 0 || !name) {
      throw new Error(`invalid player name (${name})`);
    }
    this.setState(prevState => {
      const players = prevState.players.slice();
      if (players.length > 0) {
        // check if name already exsist
        const found = players.find(p => (p.name.toLowerCase() === name.toLowerCase()));
        if (found !== undefined) {
          console.error(`player name already found (${name})`);
          return false;
        }
      }
      // pass validations, add player
      players.push({
        id: this.playerIDs++,
        name: name,
        score: 0,
        targets: this.targetIDs.map(t => ({ id: t, hitCount: 0 })),
      });
      return {players};
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

  addHit(playerId, targetId) {
    this.updateTargetScore(playerId, targetId, 1);
  }

  updateTargetScore(playerId, targetId, amount) {
    // Update taget hit count and score
    this.setState(prevState => {
      if (prevState.gameState !== 'on') {
        return false;
      }
      const players = prevState.players.slice();
      const playerIdx = this.findPlayerIndex(playerId, players);
      const targetIdx = players[playerIdx].targets.findIndex(t => t.id === targetId);
      const hitCount = players[playerIdx].targets[targetIdx].hitCount;

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
      // update target and score
      players[playerIdx].targets[targetIdx].hitCount += amount;
      players[playerIdx].score += amount;

      // do we have a winner?
      const newState = {players};
      if (players[playerIdx].score === 21) {
        newState.gameState = 'over';
        newState.winner = playerId;
      }
      return newState;
    });
  }

  startGame() {
    if (this.state.players.length === 0) {
      console.error('cannot start game, need at least 1 player');
      return false;
    }
    this.setState({gameState: 'on'});
  }

  componentDidMount() {
    defs.DEMO_PLAYERS.forEach(name => this.addPlayer(name));
  }

  render() {
    const isNew = (this.state.gameState === 'new');
    return (
      <div className={styles.app}>
         {
          (isNew) ? (
            <PlayersMgr
              players={this.state.players}
              updatePlayer={this.updatePlayer}
              removePlayer={this.removePlayer}
              addPlayer={this.addPlayer}
              startGame={this.startGame}
            />
          ) : (
            <Scoreboard
              players={this.state.players}
              addHit={this.addHit}
            />
          )
        } 
      </div>
    );
  }
}
