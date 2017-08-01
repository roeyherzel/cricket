import React from 'react';
import PropTypes from 'prop-types';
import Header from 'common/components/header';
import TargetHeaders from './components/TargetHeaders';
import Player from './components/Player';
import Target from './components/Target';
import HitDialog from './components/HitDialog';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './scoreboard.css';

export default class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.openDialog  = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.getDialog   = this.getDialog.bind(this);
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

  getDialog() {
    if (!this.state.open) return (<div></div>);

    const playerInfo = this.props.players.find(p => p.id === this.state.playerID);
    const targetInfo = playerInfo.targets.find(t => t.id === this.state.targetID);
    const handleHit  = () => this.props.updateHit(this.state.playerID, this.state.targetID);
    const handleUndo = () => this.props.updateHit(this.state.playerID, this.state.targetID, -1);
    const target = (<Target hitCount={targetInfo.hitCount} handleClick={handleHit} />);

    return (
      <HitDialog
        target={target}
        targetID={this.state.targetID}
        playerName={playerInfo.name}
        handleUndo={handleUndo}
        handleDone={this.closeDialog}
      />
    );
  }

  render() {
    const players = this.props.players.map(player => {
      return (
        <Player
          key={player.id}
          name={player.name}
          score={player.score}
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

          <Dialog
            modal={false}
            open={this.state.open}
            onRequestClose={this.closeDialog}
          >
             { this.getDialog() }
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
};
