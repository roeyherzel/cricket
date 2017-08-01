import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import WinnerSVG from './winner.inline.svg';
import styles from './winnerDialog.css';

/*
  WinnerDialog
  ------------
  - Renders dialog with:
   - winners name
   - new game button
  - Dialog controls is managed by externaly (by prop)
*/
export default class WinnerDialog extends React.Component {
  render() {
    return (
      <Dialog
        modal={true}
        open={this.props.open}
        bodyClassName={styles.body}
        overlayClassName={styles.overlay}
        >
         <p>Winner</p>
         <WinnerSVG />
         <h1>{this.props.playerName}</h1>
         <RaisedButton label="new game" onClick={this.props.closeDialog} secondary={true}/>
      </Dialog>
    );
  }
}

WinnerDialog.defaultProps = {
  playerName: 'none',
};

WinnerDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
};
