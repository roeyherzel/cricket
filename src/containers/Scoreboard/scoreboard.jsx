import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openHitDialog, newGame } from 'actions/gameActions';

import Header from 'components/header';
import Row from 'components/Row';
import Player from 'components/Player';
import Target from 'components/Target';
import HitDialog from 'containers/HitDialog';
import WinnerDialog from 'containers/WinnerDialog';

import RaisedButton from 'material-ui/RaisedButton';
import DartboardSVG from 'images/dart.inline.svg';
import styles from './scoreboard.css';


const Scoreboard = (props) => (
  <div className={styles.container}>
    <Header>
      <RaisedButton
        label="new game"
        labelStyle={{fontSize: '10px'}}
        onClick={props.handleRestart}
      />
    </Header>

    <main className={styles.board}>

      <Row key="players" head={<DartboardSVG className={styles.dartboardSVG} />}>
        {
          props.players.map(p => (
            <Player
              key={p.id}
              name={p.name}
              score={props.scores[p.id]}
              isLeader={(props.leaderID === p.id)}
            />
          ))
        }
      </Row>

       {
        props.targets.map(target => (
          <Row key={target.id} head={<span className={styles.targetID}>{target.id}</span>}>
            {
              target.players.map(p => (
                <Target
                  key={p.id}
                  hitCount={p.hitCount}
                  handleClick={() => props.handleHit(target.id, p.id)}
                />
              ))
            }
          </Row>
        ))
      }

      <HitDialog />
      <WinnerDialog />
    </main>
  </div>
);

Scoreboard.propTypes = {
  scores: PropTypes.object.isRequired,
  targets: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
  leaderID: PropTypes.number,
  handleHit: PropTypes.func.isRequired,
  handleRestart: PropTypes.func.isRequired,
};

const mapStoreToProps = state => ({
  status: state.game.status,
  players: state.players,
  targets: state.targets,
  scores: state.scores,
  leaderID: state.game.leaderID,
});

export default connect(
  mapStoreToProps,
  {
    handleHit: openHitDialog,
    handleRestart: newGame,
  }
)(Scoreboard);
