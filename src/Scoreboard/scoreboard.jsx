
import React from 'react';
import PropTypes from 'prop-types';
import Player from './components/Player';
import Target from './components/Target';
import Hit from './components/Hit';

import styles from './scoreboard.css';
import dartboardImg from 'images/dartboard.png';

export default class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.state = {
      hitDialogOpen: false,
      hitDialogPlayerID: null,
      hitDialogTargetID: null,
    };
  }

  openDialog(playerID, targetID) {
    this.setState({
      hitDialogOpen: true,
      hitDialogPlayerID: playerID,
      hitDialogTargetID: targetID,
    });
  }

  closeDialog() {
    this.setState({hitDialogOpen: false});
  }

  render() {
    const players = this.props.players.map(player => {
      const targets = player.targets.map(target => (
        <Target
          key={target.id}
          hitCount={target.hitCount}
          handleClick={() => this.openDialog(player.id, target.id)}
        />
      ));
      return (
        <Player
          key={player.id}
          name={player.name}
          score={player.score}
          >
          {targets}
        </Player>
      );
    });

    return (
      <div className={styles.container}>
        <div className={styles.legend}>
          <div className={styles.info}>
            <img src={dartboardImg} />
          </div>
          <div className={styles.headers}>
            {
              this.props.targetIDs.map(id => (
                <div key={id} className={styles.header}>
                  <span>{id}</span>
                </div>
              ))
            }
          </div>
        </div>
        {players}
        {
          (this.state.hitDialogOpen) && (
            <Hit
              allplayers={this.props.players}
              targetID={this.state.hitDialogTargetID}
              playerID={this.state.hitDialogPlayerID}
              handleDone={this.closeDialog}
              handleHit={this.props.addHit}
            />
          )
        }
      </div>
    );
  }

}

Scoreboard.propTypes = {
  targetIDs: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
  addHit: PropTypes.func.isRequired,
};
