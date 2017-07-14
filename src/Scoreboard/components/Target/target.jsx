import React from 'react';
import PropTypes from 'prop-types';

export default function Target(props) {
  const addHit = () => props.addHit(props.playerId, props.targetId);
  return (
    <div>
      <button
        onClick={addHit}>
        {props.hitCount}
      </button>
    </div>
  );
}

Target.propTypes = {
  hitCount: PropTypes.number.isRequired,
  addHit: PropTypes.func,
  targetId: PropTypes.string.isRequired,
  playerId: PropTypes.number.isRequired,
};