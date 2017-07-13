import styles from './styles.css';

import React from 'react';
import Target from '../Target';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.getCleanTargets = this.getCleanTargets.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.addHit = this.addHit.bind(this);
    this.targetNames = ['20', '19', '18', '17', '16', '15', 'B'];

    this.state = {
      score: 0,
      targets: this.getCleanTargets(),
    };
  }

  getCleanTargets() {
    return this.targetNames.map(name => (
      { name, hitCount: 0 }
    ));

  }

  addHit(targetName) {
    this.updateScore(targetName, 1);
  }

  updateScore(targetName, amount) {
    // check if game is on
    if (this.props.gameStatus !== 'running') {
      console.log('Cannot add hit. game is not running');
      return;
    }
    // cache desired target state
    const targetIndex = this.state.targets.findIndex(t => t.name === targetName);
    const targetHitCount = this.state.targets[targetIndex].hitCount;

    // on add, exit if target is closed
    if (amount > 0 && targetHitCount >= 3) {
      console.log('Target is closed');
      return;
    }
    // on remove, exit if target is empty
    if (amount < 0 && targetHitCount === 0) {
      console.log('Target is empty');
      return;
    }
    // Update taget hit count and score
    this.setState((prevState) => {
      // copy previous state
      const newState = {
        targets: prevState.targets.slice(),
        score: prevState.score,
      };
      // update target and score
      newState.targets[targetIndex].hitCount += amount;
      newState.score += amount;

      // do we have a winner?
      if (newState.score === 21) {
        this.props.endGame(this.props.id);
      }
      return newState;
    });
  }

  render() {
    return (
      <div className={styles.player}>
        <div className={styles.info}>
          <div className={styles.score}>{this.state.score}</div>
          <div className={styles.avatar} />
          <div className={styles.name}>{this.props.name}</div>
        </div>
        <div className={styles.targets}>
          {
            this.state.targets.map(t => <Target key={t.name} {...t} handleHit={this.addHit} />)
          }
        </div>
      </div>
    );
  }
}
