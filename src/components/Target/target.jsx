import React from 'react';
import PropTypes from 'prop-types';
import TargetSVG from './target.inline.svg';
import styles from './target.css';

// Renders button with SVG representation of current target's hitCount

const Target = ({hitCount, handleClick}) => (
  <button type="button" className={styles.container} onClick={handleClick}>
    <TargetSVG className={styles.target} data-hits={hitCount} />
  </button>
);

Target.propTypes = {
  hitCount: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Target;
