import React from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import UndoSVG from 'material-ui/svg-icons/content/undo';

import DartSVG from 'images/dart.inline.svg';
import styles from './hitDialog.css';

export default class HitDialog extends React.Component {
  render() {
    return (
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
            label="Undo"
            icon={<UndoSVG />}
            onClick={this.props.handleUndo}
          />
          <RaisedButton
            label="Done"
            primary={true}
            onClick={this.props.handleDone}
          />
        </section>

      </div>
    );
  }

}

HitDialog.propTypes = {
  target: PropTypes.element.isRequired,
  targetID: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  handleDone: PropTypes.func.isRequired,
  handleUndo: PropTypes.func.isRequired,
};
