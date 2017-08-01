import React from 'react';
import PropTypes from 'prop-types';
import Header from 'common/components/header';
import Player from './components/Player';
import Target from './components/Target';
import Hit from './components/Hit';

import RaisedButton from 'material-ui/RaisedButton';

import styles from './scoreboard.css';
import DartboardSVG from './components/Hit/dart.inline.svg';

export default class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.openDialog  = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.getDialog   = this.getDialog.bind(this);
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

  getDialog() {
    const playerInfo = this.props.players.find(p => p.id === this.state.hitDialogPlayerID);
    const targetInfo = playerInfo.targets.find(t => t.id === this.state.hitDialogTargetID);
    const handleHit  = () => this.props.updateHit(this.state.hitDialogPlayerID, this.state.hitDialogTargetID);
    const handleUndo = () => this.props.updateHit(this.state.hitDialogPlayerID, this.state.hitDialogTargetID, -1);
    const target = (<Target hitCount={targetInfo.hitCount} handleClick={handleHit} />);

    return (
      <Hit
        target={target}
        targetID={this.state.hitDialogTargetID}
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
          <div className={styles.targetHeaders}>
            <div className={styles.colHeader}>
              <DartboardSVG className={styles.dartboardSVG} />
            </div>
            <div className={styles.targetIDs}>
              {
                this.props.targetIDs.map(id => (
                  <div key={id} className={styles.rowHeader}>
                    <span>{id}</span>
                  </div>
                ))
              }
            </div>
          </div>
          { players }
          { (this.state.hitDialogOpen) && this.getDialog() }
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
