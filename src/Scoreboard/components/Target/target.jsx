import React from 'react';
import PropTypes from 'prop-types';

import TargetSVG from './target.inline.svg';
import styles from './target.css';

export default class Target extends React.Component {

  render() {
    return (
      <button type="button" className={styles.container} onClick={this.props.handleClick}>
         <TargetSVG className={styles.target} data-hits={this.props.hitCount} data-bigsize={this.props.bigsize} />
      </button>
    );
  }

}

Target.defaultProps = {
  hitCount: 0,
  bigsize: false,
};

Target.propTypes = {
  hitCount: PropTypes.number,
  handleClick: PropTypes.func,
  bigsize: PropTypes.bool,
};
