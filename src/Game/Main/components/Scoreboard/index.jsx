import styles from './styles.scss';

import React from 'react';
import Player from '../Player';

export default class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.targetNames = ['20', '19', '18', '17', '16', '15', 'B'];
  }

  render() {
    return (
      <div className={styles.scoreboard}>
        {
          this.props.players.map(p =>
            <Player
              key={p.id}
              gameStatus={this.props.gameStatus}
              endGame={this.props.endGame}
              {...p}
            />
          )
        }
      </div>
    );
  }
  
}