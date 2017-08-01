import styles from './player.css';

import React from 'react';
import PropTypes from 'prop-types';

export default class Player extends React.Component {
  render() {
    return (
      <div className={styles.player}>
         <div className={styles.header} data-leader={this.props.isLeader}>
          <div className={styles.score}>{this.props.score}</div>
          <div className={styles.name}>{this.props.name}</div>
        </div>
        <div className={styles.targets}>{this.props.children}</div>
      </div>
    );
  }

}

Player.defaultProps = {
  isLeader: false,
};

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  children: PropTypes.array,
  isLeader: PropTypes.bool,
};
