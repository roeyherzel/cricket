import React from 'react';
import PropTypes from 'prop-types';
import Header from 'common/components/header';
import TargetHeaders from './components/TargetHeaders';
import Player from './components/Player';
import Target from './components/Target';
import HitDialog from './components/HitDialog';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import WinnerSVG from 'images/winner.inline.svg';
import styles from './scoreboard.css';

export default class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.openDialog     = this.openDialog.bind(this);
    this.closeDialog    = this.closeDialog.bind(this);
    this.getDialogProps = this.getDialogProps.bind(this);
    this.state = {
      open: false,
      playerID: null,
      targetID: null,
    };
  }

  openDialog(playerID, targetID) {
    this.setState({
      open: true,
      playerID: playerID,
      targetID: targetID,
    });
  }

  closeDialog() {
    this.setState({open: false});
  }

  getDialogProps() {
    if (!this.state.open) return {};

    const playerInfo = this.props.players.find(p => p.id === this.state.playerID);
    const targetInfo = playerInfo.targets.find(t => t.id === this.state.targetID);
    const handleUndo = () => this.props.updateHit(this.state.playerID, this.state.targetID, -1);
    const handleHit  = () => this.props.updateHit(this.state.playerID, this.state.targetID);

    return {
      target: (<Target hitCount={targetInfo.hitCount} handleClick={handleHit} />),
      targetID: this.state.targetID,
      playerName: playerInfo.name,
      handleUndo,
    };
  }

  render() {
    const players = this.props.players.map(player => {
      return (
        <Player
          key={player.id}
          name={player.name}
          score={player.score}
          isLeader={(this.props.leaderID === player.id)}
          >
          {
            player.targets.map(target => (
              <Target
                key={target.id}
                hitCount={target.hitCount}
                handleClick={() => this.openDialog(player.id, target.id)}
              />
            ))
          }
        </Player>
      );
    });

    return (
      <div className={styles.container}>
        <Header>
          <RaisedButton
            label="new game"
            className={styles.restartGameBtn}
            onClick={this.props.restartGame}
          />
        </Header>

        <main className={styles.board}>
          <TargetHeaders targetIDs={this.props.targetIDs} />

          { players }

          <HitDialog
            open={this.state.open}
            closeDialog={this.closeDialog}
            {...this.getDialogProps()}
          />

          <Dialog
            modal={true}
            open={(this.props.winnerID !== null)}
            contentClassName={styles.winnerDialog}
            overlayClassName={styles.winnerDialogOverlay}
            >
            <WinnerSVG />
            <h1>{this.state.winnerID}</h1>

          </Dialog>
        </main>
      </div>
    );
  }

}

Scoreboard.propTypes = {
  targetIDs: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
  updateHit: PropTypes.func.isRequired,
  restartGame: PropTypes.func.isRequired,
  leaderID: PropTypes.number,
  winnerID: PropTypes.number,
};
