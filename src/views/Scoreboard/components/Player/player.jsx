import styles from './player.css';

import React from 'react';
import PropTypes from 'prop-types';

export default function Player(props) {
  return (
    <div className={styles.player}>
       <div className={styles.info}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.score}>{props.score}</div>
      </div>
      <div className={styles.targets}>{props.children}</div>
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  children: PropTypes.array,
};
