import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardHeader, CardText } from 'material-ui/Card';

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
      <Card className={styles.container}>
        <CardHeader title="Players" />
        <CardText>
          {this.props.children}
        </CardText>
      </Card>
    );
  }
}

List.propTypes = {
  children: PropTypes.array,
};
