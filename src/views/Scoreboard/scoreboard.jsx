import React from 'react';
import PropTypes from 'prop-types';
import Header from 'common/components/header';
import TargetHeaders from './components/TargetHeaders';
import Player from './components/Player';
import Target from './components/Target';
import HitDialog from './components/HitDialog';
import WinnerDialog from './components/WinnerDialog';

import RaisedButton from 'material-ui/RaisedButton';

import styles from './scoreboard.css';

export default class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.openHitDialog        = this.openHitDialog.bind(this);
    this.closeHitDialog       = this.closeHitDialog.bind(this);
    this.getHitDialogProps    = this.getHitDialogProps.bind(this);
    this.getWinnerDialogProps = this.getWinnerDialogProps.bind(this);
    this.state = {
      hitDialogOpen: false,
      playerID: null,
      targetID: null,
    };
  }

  openHitDialog(playerID, targetID) {
    this.setState({ hitDialogOpen: true, playerID, targetID });
  }

  closeHitDialog() {
    this.setState({ hitDialogOpen: false });
  }

  getHitDialogProps() {
    if (!this.state.hitDialogOpen) return {};

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

  getWinnerDialogProps() {
    if (this.props.winnerID === null) return {};

    const playerInfo = this.props.players.find(p => p.id === this.props.winnerID);
    return {
      playerName: playerInfo.name,
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
                handleClick={() => this.openHitDialog(player.id, target.id)}
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
            labelStyle={{fontSize: '12px'}}
            onClick={this.props.restartGame}
          />
        </Header>

        <main className={styles.board}>
          <TargetHeaders targetIDs={this.props.targetIDs} />

          { players }

          <HitDialog
            open={this.state.hitDialogOpen}
            closeDialog={this.closeHitDialog}
            { ...this.getHitDialogProps() }
          />

          <WinnerDialog
            open={(this.props.winnerID !== null)}
            closeDialog={this.props.restartGame}
            { ...this.getWinnerDialogProps() }
          />
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
