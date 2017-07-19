import styles from './logo.css';
import logoImage from './logo.png';

import React from 'react';

export default class Logo extends React.Component {
  render() {
    return (
      <div className={styles.logo}>
        <img src={logoImage} />
      </div>
    );
  }
}
