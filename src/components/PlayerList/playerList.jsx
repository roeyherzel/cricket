import React from 'react';
import PropTypes from 'prop-types';

import Divider from 'material-ui/Divider';
import styles from './playerList.css';

/*
 * List Players
 * ------------
 * renders list of players or none
 */

const PlayerList = ({children}) => {
  return (children.length > 0) ? (
    <div className={styles.container}>
      <Divider className={styles.hr}/>
      {children}
    </div>
  ) : (
    <div />
  );
};

PlayerList.propTypes = {
  children: PropTypes.array.isRequired,
};

export default PlayerList;
