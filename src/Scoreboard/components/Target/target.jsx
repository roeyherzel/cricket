import React from 'react';
import PropTypes from 'prop-types';

export default function Target(props) {
  const handleHit = () => props.handleHit(props.playerId, props.targetId);
  return (
    <div>
      <button
        onClick={handleHit}>
        {props.hitCount}
      </button>
    </div>
  );
}

Target.propTypes = {
  hitCount: PropTypes.number.isRequired,
  handleHit: PropTypes.func,
  targetId: PropTypes.string.isRequired,
  playerId: PropTypes.number.isRequired,
};