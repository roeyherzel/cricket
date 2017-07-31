import React from 'react';
import PropTypes from 'prop-types';

import Divider from 'material-ui/Divider';

import styles from './list.css';

export default class List extends React.Component {
  render() {
    return (this.props.children.length > 0) ? (
      <div className={styles.container}>
        <Divider className={styles.hr}/>
        {this.props.children}
      </div>
    ) : (
      <div />
    );
  }
}

List.propTypes = {
  children: PropTypes.array,
};
