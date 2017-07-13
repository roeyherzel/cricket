import styles from './header.css';

import React from 'react';
import PropTypes from 'prop-types';

export default function Header(props) {
  return (
    <div className={styles.header}>
      <h1>Jiminy Cricket</h1>
      <div>
         {props.children}
      </div>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.object,
};