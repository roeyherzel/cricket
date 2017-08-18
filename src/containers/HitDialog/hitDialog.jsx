import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeHitDialog, addHit, removeHit } from 'actions/gameActions';

import Target from 'components/Target';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import UndoSVG from 'material-ui/svg-icons/content/undo';
import DartSVG from 'images/dart.inline.svg';
import styles from './hitDialog.css';

/*
  HitDialog
  ---------
  - Renders dialog with target info and buttons/actions:
    - Target: to add hit
    - undo/remove hit
    - done
*/

class HitDialog extends React.Component {
  render() {
    return (
      <Dialog
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.handleClose}
        >
        {
          (this.props.open) && (
            <div className={styles.container}>
              <section className={styles.info}>
                 <h3 className={styles.playerName}>{this.props.playerName}</h3>
                 <h3 className={styles.targetID}>{this.props.targetID}</h3>
              </section>

              <section className={styles.targetBtn}>
                 <Target hitCount={this.props.hitCount} handleClick={this.props.handleAdd} />
              </section>

              <section className={styles.actions}>
                <FlatButton
                  className={styles.undoBtn}
                  icon={<UndoSVG />}
                  onClick={this.props.handleRemove}
                />

                <DartSVG className={styles.dartIcon} />

                <FlatButton
                  className={styles.doneBtn}
                  label="Done"
                  primary={true}
                  onClick={this.props.handleClose}
                />
              </section>
            </div>
          )
        }
      </Dialog>
    );
  }

}

HitDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,

  // not required if dialog is closed
  targetID: PropTypes.string,
  playerID: PropTypes.number,
  playerName: PropTypes.string,
  hitCount: PropTypes.number,
};

const mapStoreToProps = state => {
  const { open, targetID, playerID } = state.hitDialog;
  if (!open) return { open };

  const { name }     = state.players.find(p => p.id === playerID);
  const { players }  = state.targets.find(t => t.id === targetID);
  const { hitCount } = players.find(p => p.id === playerID);

  return {
    open,
    targetID,
    playerID,
    playerName: name,
    hitCount,
  };
};

const mapDispatchToProps = {
  handleClose: closeHitDialog,
  handleAdd: addHit,
  handleRemove: removeHit,
};

const mergeProps = (stateProps, dispatchProps) => {
  const { targetID, playerID } = stateProps;
  return {
    ...stateProps,
    ...dispatchProps,
    handleAdd: () => dispatchProps.handleAdd(targetID, playerID),
    handleRemove: () => dispatchProps.handleRemove(targetID, playerID),
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
  mergeProps,
)(HitDialog);
