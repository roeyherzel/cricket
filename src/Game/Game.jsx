import styles from './game.css';

import React from 'react';
import Header from './components/Header';
import Settings from './components/Settings';
import Scoreboard from './components/Scoreboard';

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


export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.initPlayer = this.initPlayer.bind(this);
    this.targetIDs = ['20', '19', '18', '17', '16', '15', 'B'];
    this.state = {
      status: 'new',
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
    this.setState({status: 'on'});
  }

  render() {
    const isNew = (this.state.status === 'new');
    return (
      <div className={styles.game}>
        <Header>
          const isNew = (this.state.status === 'new');
          return (
            <div className={styles.game}>
              <Header>
                {
                  (isNew) ? (
                    <button type="button" onClick={this.handleStartGame}>Start</button>
                  ) : (
                    <button type="button" onClick={this.handleNewGame}>New</button>
                  )
                } 
              </Header>
              <main>
                {
                  (isNew) ? (
                    <Settings />
                  ) : (
                    <Scoreboard players={this.state.players}/>
                  )
                }
              </main>
            </div>
          );
              <button type="button" onClick={this.handleStartGame}>Start</button>
            ) : (
              <button type="button" onClick={this.handleNewGame}>New</button>
            )
          } 
        </Header>
        <main>
          {
            (isNew) ? (
              <Settings />
            ) : (
              <Scoreboard players={this.state.players}/>
            )
          }
        </main>
      </div>
    );
  }

}
