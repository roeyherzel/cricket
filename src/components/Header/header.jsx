import React from 'react';
import PropTypes from 'prop-types';

import styles from './header.css';

const Header = ({children}) => (
  <header className={styles.header} data-child={(children !== undefined)}>
    <h1 className={styles.title}>Cricket Darts</h1>
    { children }
  </header>
);

Header.propTypes = {
  children: PropTypes.element,
};

export default Header;
