import React from 'react';

export default function Target(props) {
  return (
    <div>
      <button onClick={() => props.handleHit(props.name)}>{props.hitCount}</button>
    </div>
  );
}