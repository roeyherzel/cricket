import styles from './app.scss';

import React from 'react';
import Players from 'Players';
import defs from 'utils/defs';

export default class App extends React.Component {
  constructor() {
    super();
    this.handleStartGame = this.handleStartGame.bind(this);
    this.initPlayer = this.initPlayer.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.findPlayerIndex = this.findPlayerIndex.bind(this);
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

  handleStartGame() {
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
            <Players
              gameState={this.state.gameState}
              players={this.state.players}
              updatePlayer={this.updatePlayer}
              removePlayer={this.removePlayer}
              addPlayer={this.addPlayer}
            />
          ) : 'Board'
        } 
      </div>
    );
  }
}
