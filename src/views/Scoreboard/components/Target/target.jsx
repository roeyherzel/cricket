import React from 'react';
import PropTypes from 'prop-types';
import TargetSVG from './target.inline.svg';
import styles from './target.css';

/*
  Target
  ------
  - Renders button with SVG representation of current target's hitCount
*/
export default class Target extends React.Component {
  render() {
    return (
      <button type="button" className={styles.container} onClick={this.props.handleClick}>
        <TargetSVG className={styles.target} data-hits={this.props.hitCount} />
      </button>
    );
  }

}

Target.defaultProps = {
  hitCount: 0,
};

Target.propTypes = {
  hitCount: PropTypes.number,
  handleClick: PropTypes.func,
};
