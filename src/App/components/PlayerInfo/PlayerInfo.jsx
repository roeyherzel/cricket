import React from 'react';
import PropTypes from 'prop-types';

export default function PlayerInfo(props) {
  return (
    <div>
      <div>{props.name}</div>
    </div>
  );
}

PlayerInfo.propTypes = {
  name: PropTypes.string,
};