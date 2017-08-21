import React from 'react';
import PropTypes from 'prop-types';
import styles from './row.css';

const Row = ({head, children}) => (
  <div className={styles.container}>
    <div className={styles.head}>{head}</div>
    <div className={styles.data}>{children}</div>
  </div>
);

Row.propTypes = {
  head: PropTypes.element,
  children: PropTypes.array,
};

export default Row;
