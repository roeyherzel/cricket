import styles from './cta.css';

import React from 'react';
import PropTypes from 'prop-types';

export default class CTA extends React.Component {
  render() {
    return (
      <button className={styles.cta} onClick={this.props.handleClick}>
        {this.props.children}
      </button>
    );
  }
}

CTA.propTypes = {
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.string,
};
