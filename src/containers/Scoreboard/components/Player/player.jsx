import React from 'react';
import PropTypes from 'prop-types';
import styles from './player.css';

/*
  Player
  ------
  - Renders player component with players info
*/
export default class Player extends React.Component {
  render() {
    return (
      <div className={styles.container} data-leader={this.props.isLeader}>
        <div className={styles.score}>{this.props.score}</div>
        <div className={styles.name}>{this.props.name}</div>
      </div>
    );
  }

}

Player.defaultProps = {
  isLeader: false,
};

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  isLeader: PropTypes.bool,
};
