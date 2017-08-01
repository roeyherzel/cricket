import React from 'react';
import PropTypes from 'prop-types';
import DartboardSVG from 'images/dart.inline.svg';
import styles from './targetHeaders.css';

/*
  TargetHeaders
  -------------
  - Renders first column of the scoreboard with target numbers
*/
export default class TargetHeaders extends React.Component {
  render() {
    return (
      <div className={styles.targetHeaders}>
        <div className={styles.colHeader}>
          <DartboardSVG className={styles.dartboardSVG} />
        </div>
        <div className={styles.targetIDs}>
          {
            this.props.targetIDs.map(id => (
              <div key={id} className={styles.rowHeader}>
                <span>{id}</span>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

TargetHeaders.propTypes = {
  targetIDs: PropTypes.array.isRequired,
};
