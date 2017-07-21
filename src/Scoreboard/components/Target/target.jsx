import React from 'react';
import PropTypes from 'prop-types';

import styles from './target.css';

export default class Target extends React.Component {

  render() {
    return (
      <div className={styles.container}>
        <button
          type="button"
          onClick={this.props.handleClick}
          >
            {this.props.hitCount}
          </button>
      </div>
    );
  }

}

Target.propTypes = {
  hitCount: PropTypes.number.isRequired,
  handleClick: PropTypes.func,
};
