import React from 'react';
import PropTypes from 'prop-types';

import styles from './header.css';

export default class Header extends React.Component {
  render() {
    return (
      <header className={styles.header} data-child={(this.props.children !== undefined)}>
        <h1 className={styles.title}>Cricket Darts</h1>
        { this.props.children }
      </header>
    );
  }
}

Header.propTypes = {
  children: PropTypes.element,
};
