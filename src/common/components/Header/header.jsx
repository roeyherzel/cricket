import styles from './header.css';
import logo from './images/logo.png';

import React from 'react';
import PropTypes from 'prop-types';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        {/* <img className={styles.jiminy} src={logo}/> */}
      </div>
    </div>
  );
}
