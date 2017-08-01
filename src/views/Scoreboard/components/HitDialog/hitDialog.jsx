import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
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

export default class HitDialog extends React.Component {
  render() {
    return (
      <Dialog
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.closeDialog}
        >
        <div className={styles.dialog}>
          <section className={styles.info}>
             <h3 className={styles.playerName}>{this.props.playerName}</h3>
             <DartSVG className={styles.dartIcon} />
             <h3 className={styles.targetID}>{this.props.targetID}</h3>
          </section>

          <section className={styles.targetBtn}>
             { this.props.target }
          </section>

          <section className={styles.actions}>
            <RaisedButton
              className={styles.undoBtn}
              icon={<UndoSVG />}
              onClick={this.props.handleUndo}
            />
            <RaisedButton
              className={styles.doneBtn}
              label="Done"
              primary={true}
              onClick={this.props.closeDialog}
            />
          </section>
        </div>
      </Dialog>
    );
  }

}

HitDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  target: PropTypes.element,
  targetID: PropTypes.string,
  playerName: PropTypes.string,
  handleUndo: PropTypes.func,
};
