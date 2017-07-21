import React from 'react';
import PropTypes from 'prop-types';

import styles from './hit.css';

export default class Hit extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOut = this.handleClickOut.bind(this);
  }

  handleClickOut(e) {
    if (e.target === this.container) {
      this.props.handleDone();
    } else {
      console.log(this.container);
    }
  }

  render() {
    const playerInfo = this.props.allplayers.find(p => p.id === this.props.playerID);
    const targetInfo = playerInfo.targets.find(t => t.id === this.props.targetID);

    return (
      <div
        className={styles.container}
        ref={(container) => {this.container = container;}}
        onClick={this.handleClickOut}>

        <div className={styles.dialog}>
          <div className={styles.name}>{playerInfo.name}</div>
          <button
            type="button"
            className={styles.hitCount}
            onClick={() => this.props.handleHit(playerInfo.id, targetInfo.id)}
            >
            {targetInfo.hitCount}
          </button>
          <button
            type="button"
            className={styles.done}
            onClick={this.props.handleDone}
            >
            Done
          </button>
        </div>
      </div>
    );
  }

}

Hit.propTypes = {
  allplayers: PropTypes.array.isRequired,
  playerID: PropTypes.number.isRequired,
  targetID: PropTypes.string.isRequired,
  handleDone: PropTypes.func.isRequired,
  handleHit: PropTypes.func.isRequired,
};
