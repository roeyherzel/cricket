import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openHitDialog } from 'actions/gameActions';

import Header from 'common/components/header';
import Row from 'components/Row';
import Player from 'components/Player';
import Target from 'components/Target';
import HitDialog from 'containers/HitDialog';
// import WinnerDialog from './components/WinnerDialog';

import RaisedButton from 'material-ui/RaisedButton';
import DartboardSVG from 'images/dart.inline.svg';
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

class Scoreboard extends React.Component {

  getWinnerDialogProps() {
    // Returns properies need for rendering winnerDialog
    if (this.props.winnerID === null) return {};

    const playerInfo = this.props.players.find(p => p.id === this.props.winnerID);
    return {
      playerName: playerInfo.name,
    };
  }

  render() {
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

          <Row key="players" head={<DartboardSVG className={styles.dartboardSVG} />}>
            {
              this.props.players.map(p => (
                <Player
                  key={p.id}
                  name={p.name}
                  score={this.props.scores[p.id]}
                  isLeader={(this.props.leaderID === p.id)}
                />
              ))
            }
          </Row>

           {
            this.props.targets.map(target => (
              <Row key={target.id} head={<span>{target.id}</span>}>
                {
                  target.players.map(p => (
                    <Target
                      key={p.id}
                      hitCount={p.hitCount}
                      handleClick={() => this.props.handleHit(target.id, p.id)}
                    />
                  ))
                }
              </Row>
            ))
          }

          <HitDialog />

          {/* <WinnerDialog
            open={(this.props.winnerID !== null)}
            closeDialog={this.props.restartGame}
            { ...this.getWinnerDialogProps() }
          /> */}
        </main>
      </div>
    );
  }

}

Scoreboard.defaultProps = {
  leaderID: null,
  winnerID: null,
};

Scoreboard.propTypes = {
  updateHit: PropTypes.func,
  restartGame: PropTypes.func,
  leaderID: PropTypes.number,
  winnerID: PropTypes.number,

  scores: PropTypes.object.isRequired,
  targets: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
  handleHit: PropTypes.func.isRequired,
};

const mapStoreToProps = state => ({
  status: state.game.status,
  players: state.players,
  targets: state.targets,
  scores: state.scores,
});

export default connect(
  mapStoreToProps,
  {
    handleHit: openHitDialog,
  }
)(Scoreboard);
