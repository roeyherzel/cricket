import styles from './styles.css';

import React from 'react';
import Target from '../Target';

export default function Player(props) {

  return (
    <div className={styles.player}>
      <div className={styles.info}>
        <div className={styles.score}>{props.score}</div>
        <div className={styles.avatar} />
        <div className={styles.name}>{props.name}</div>
      </div>
      <div className={styles.targets}>{props.children}</div>
    </div>
  );
}