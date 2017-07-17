import styles from './header.css';
import jiminy from './images/jiminy-hat-2000x2190.png';
import dartboard from './images/dartboard-453x.png';

import React from 'react';
import PropTypes from 'prop-types';

export default function Header(props) {
  return (
    <div className={styles.header}>
      <div className="logo">
        <img src={jiminy}/>
        <img src={dartboard}/>
      </div>

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
