import React from 'react';
import PropTypes from 'prop-types';

import styles from './hit.css';

export default class Hit extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOut = this.handleClickOut.bind(this);
  }

  handleClickOut(e) {
    if (e.target === this.container) {
      this.props.handleDone();
    } else {
      console.log(this.container);
    }
  }

  render() {
    return (
      <div
        className={styles.container}
        ref={(container) => {this.container = container;}}
        onClick={this.handleClickOut}>

        <div className={styles.dialog}>
          <div className={styles.name}>{this.props.playerName}</div>
          { this.props.children }
          <button type="button" className={styles.done} onClick={this.props.handleDone}>
            Done
          </button>
        </div>
      </div>
    );
  }

}

Hit.propTypes = {
  children: PropTypes.element.isRequired,
  targetID: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  handleDone: PropTypes.func.isRequired,
};
