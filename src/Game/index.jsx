import styles from './styles.scss';

import React from 'react';
import Main from './Main';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.startGame   = this.startGame.bind(this);
    this.newGame = this.newGame.bind(this);
    this.endGame     = this.endGame.bind(this);
    this.isNewGame   = this.isNewGame.bind(this);
    this.state = {
      players: [
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
      ],
      gameStatus: 'new',
      winner: null,
    };
  }

  startGame() {
    if (this.state.players.length === 0) {
      throw new Error('Cannot start game, please add players');
    }
    this.setState({ gameStatus: 'running' });
  }

  endGame(playerId) {
    this.setState({gameStatus: 'over', winner: playerId});
  }

  newGame() {
    this.setState({ gameStatus: 'new' });
  }

  isNewGame() {
    return (this.state.gameStatus === 'new');
  }

  render() {
    return (
      <div className={styles.game}>
        <div className={styles.header}>
          <h1>Jiminy Cricket</h1>
          <div>
            {
              this.isNewGame() ? (
                <button type="button" onClick={this.startGame}>Start</button>
              ) : (
                <button type="button" onClick={this.newGame}>New</button>
              )
            }
          </div>
        </div>
        <Main
          gameStatus={this.state.gameStatus}
          isNewGame={this.isNewGame}
          endGame={this.endGame}
          players={this.state.players}
          />
      </div>
    );
  }

}
