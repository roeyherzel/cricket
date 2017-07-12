import React from 'react';

export default function Target(props) {
  return (
    <div>
      <button
        onClick={() => props.handleHit(props.playerId, props.targetId)}>
        {props.hitCount}
      </button>
    </div>
  );
}