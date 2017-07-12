import React from 'react';
import Scoreboard from './components/Scoreboard';

export default function Main(props) {
  const gameOn = (props.gameStatus === 'running');
  return (
    <div>
      {
        (!props.isNewGame()) ? (
          <Scoreboard
            gameStatus={props.gameStatus}
            endGame={props.endGame}
            numbers={props.targetNums}
            players={props.players}
          />
        ) : (
          <div></div>
        )
      }
      
    </div>
  );
}