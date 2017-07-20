import styles from './list.css';

import React from 'react';
import PropTypes from 'prop-types';

export default class List extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        {/* <h2>Players</h2> */}
        <div className={styles.list}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

List.propTypes = {
  children: PropTypes.array,
};
