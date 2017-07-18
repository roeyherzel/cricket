import styles from './alert.css';

import React from 'react';
import PropTypes from 'prop-types';

export default class Alert extends React.Component {
  render() {
    const show = (this.props.message.length > 0);
    return (
      (show) ? (
        <section className={styles.alert}>
          {this.props.message}
        </section>
      ) : (
        <div/>
      )
    );
  }
}

Alert.propTypes = {
  on: PropTypes.bool,
  message: PropTypes.string,
};

Alert.defaultProps = {
  message: '',
};
