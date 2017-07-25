import React from 'react';
import PropTypes from 'prop-types';

import DartSVG from './dart.inline.svg';
import undoIcon from './undo.svg';
import styles from './hit.css';

export default class Hit extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOut = this.handleClickOut.bind(this);
  }

  handleClickOut(e) {
    if (e.target === this.el) this.props.handleDone();
  }

  render() {
    return (
      <div
        className={styles.overlay}
        ref={(el) => {this.el = el;}}
        onClick={this.handleClickOut}>

        <div className={styles.dialog}>

          <section className={styles.info}>
             <div className={styles.playerName}>{this.props.playerName}</div>
             <DartSVG className={styles.dartIcon} />
             <div className={styles.targetID}>{this.props.targetID}</div>
          </section>

          <section className={styles.targetBtn}>
            { this.props.targetBtn }
          </section>

          <section className={styles.actions}>
            <button className={styles.undoBtn} onClick={this.props.handleUndo}>
              <img src={undoIcon} />
            </button>
            <button type="button" className={styles.doneBtn} onClick={this.props.handleDone}>
              Done
            </button>
          </section>

        </div>
      </div>
    );
  }

}

Hit.propTypes = {
  targetBtn: PropTypes.element.isRequired,
  targetID: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  handleDone: PropTypes.func.isRequired,
  handleUndo: PropTypes.func.isRequired,
};
