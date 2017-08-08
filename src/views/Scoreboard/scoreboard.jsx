import React from 'react';
import PropTypes from 'prop-types';
import Row from './components/Row';
import Header from 'common/components/header';
import DartboardSVG from 'images/dart.inline.svg';
import Player from './components/Player';
import Target from './components/Target';
import HitDialog from './components/HitDialog';
import WinnerDialog from './components/WinnerDialog';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './scoreboard.css';

/*
  Scoreboard
  ----------
  - Renders grid scoreboard with
    - target headers column
    - columns containing a player and it's targets
  - render & manage the state of hit dialog open/close
  - render winner dialog
*/

export default class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.openHitDialog        = this.openHitDialog.bind(this);
    this.closeHitDialog       = this.closeHitDialog.bind(this);
    this.getHitDialogProps    = this.getHitDialogProps.bind(this);
    this.getWinnerDialogProps = this.getWinnerDialogProps.bind(this);
    // HitDialog related states
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
    // Returns properies need for rendering player's hitDialog
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
    // Returns properies need for rendering winnerDialog
    if (this.props.winnerID === null) return {};

    const playerInfo = this.props.players.find(p => p.id === this.props.winnerID);
    return {
      playerName: playerInfo.name,
    };
  }

  render() {
    const targets = {};
    for (let t of this.props.targetIDs) {
      targets[t] = [];
    }
    // Create player components with child targets
    const players = this.props.players.map(p => {

      for (let t of p.targets) {
        targets[t.id].push(
          <Target
            key={p.id}
            hitCount={t.hitCount}
            handleClick={() => this.openHitDialog(p.id, t.id)}
          />
        );
      }

      return (
        <Player
          key={p.id}
          name={p.name}
          score={p.score}
          isLeader={(this.props.leaderID === p.id)}
        />
      );
    });

    return (
      <div className={styles.container}>
        <Header>
          <RaisedButton
            label="new game"
            labelStyle={{fontSize: '10px'}}
            onClick={this.props.restartGame}
          />
        </Header>

        <main className={styles.board}>

          <Row
            head={<DartboardSVG className={styles.dartboardSVG} />}
            data={players}
          />

          {
            this.props.targetIDs.map(t => (
              <Row
                key={t}
                head={<span>{t}</span>}
                data={targets[t]}
              />
            ))
          }

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
