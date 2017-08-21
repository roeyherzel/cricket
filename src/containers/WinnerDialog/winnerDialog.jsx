import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { newGame } from 'actions/gameActions';

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
*/
const WinnerDialog = ({open, playerName, handleClose}) => (
  <Dialog
    modal={true}
    open={open}
    bodyClassName={styles.body}
    overlayClassName={styles.overlay}
    >
      <p>We have a Winner!</p>
      <WinnerSVG />
      <h1>{playerName}</h1>
      <RaisedButton label="new game" onClick={handleClose} secondary={true}/>
  </Dialog>
);

WinnerDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  playerName: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapStoreToProps = state => {
  const { status, leaderID } = state.game;
  const open = (status === 'over');
  const playerName = (open) ? state.players.find(p => p.id === leaderID).name : '';

  return {
    open,
    playerName,
  };
};

export default connect(
  mapStoreToProps,
  {
    handleClose: newGame,
  },
)(WinnerDialog);
