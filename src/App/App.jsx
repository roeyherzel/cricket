import styles from './app.scss';

import React from 'react';
import Home from './containers/Home';

const initialPlayers = [
  {
    id: 1,
    name: 'Roey',
  },
  {
    id: 2,
    name: 'Alizah',
  },
  {
    id: 3,
    name: 'Herzel',
  },
  {
    id: 4,
    name: 'Davis',
  },
];

export default class App extends React.Component {
  constructor() {
    super();
    this.handleStartGame = this.handleStartGame.bind(this);
    this.initPlayer = this.initPlayer.bind(this);
    this.targetIDs = ['20', '19', '18', '17', '16', '15', 'B'];
    this.state = {
      gameState: 'new',
      winner: null,
      players: initialPlayers.map(this.initPlayer),
    };
  }

  initPlayer(player) {
    player.score = 0;
    player.targets = this.targetIDs.map(t => ({ id: t, hitCount: 0 }));
    return player;
  }

  handleStartGame() {
    this.setState({gameState: 'on'});
  }

  render() {
    const isNew = (this.state.gameState === 'new');
    return (
      <div className={styles.app}>
         {
          (isNew) ? (
            <Home
              gameState={this.state.gameState}
              players={this.state.players} />
          ) : 'Board'
        } 
      </div>
    );
  }
}
