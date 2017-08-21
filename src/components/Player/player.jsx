import React from 'react';
import PropTypes from 'prop-types';
import styles from './player.css';

// Renders player component with players info

const Player = ({name, score, isLeader}) => (
  <div className={styles.container} data-leader={isLeader}>
    <div className={styles.score}>{score}</div>
    <div className={styles.name}>{name}</div>
  </div>
);

Player.defaultProps = {
  isLeader: false,
};

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  isLeader: PropTypes.bool,
};

export default Player;
