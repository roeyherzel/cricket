import React from 'react';
import PropTypes from 'prop-types';

import DartboardSVG from 'images/dartboard.inline.svg';
import styles from './list.css';

export default class List extends React.Component {
  render() {
    if (this.props.children.length === 0){
      return (
        <DartboardSVG className={styles.dartboardSVG}/>
      );
    }
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    );
  }
}

List.propTypes = {
  children: PropTypes.array,
};
