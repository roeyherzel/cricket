import React from 'react';
import PropTypes from 'prop-types';
import styles from './row.css';

export default class Row extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.head}>{this.props.head}</div>
        <div className={styles.data}>{this.props.data}</div>
      </div>
    );
  }
}

Row.propTypes = {
  head: PropTypes.element,
  data: PropTypes.array,
};
