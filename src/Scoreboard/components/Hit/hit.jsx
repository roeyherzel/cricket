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
    if (e.target === this.el) {
      this.props.handleDone();
    } else {
      console.log(this.el);
    }
  }

  render() {
    return (
      <div
        className={styles.overlay}
        ref={(el) => {this.el = el;}}
        onClick={this.handleClickOut}>

        <div className={styles.dialog}>
          { this.props.targetBtn }
          <section className={styles.info}>
             <div className={styles.playerName}>{this.props.playerName}</div>
             {/* <img className={styles.dartIcon} src={dartIcon} /> */}
             <DartSVG className={styles.dartIcon} />
             <div className={styles.targetID}>{this.props.targetID}</div>
          </section>
          <section className={styles.actions}>
            <button className={styles.undoBtn} >
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
};
