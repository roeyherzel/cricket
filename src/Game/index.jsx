import React from "react";
import Scoreboard from "./scenes/Scoreboard";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.getCleanTargets = this.getCleanTargets.bind(this);
    this.updateScore     = this.updateScore.bind(this);
    this.addHit          = this.addHit.bind(this);
    this.startGame        = this.startGame.bind(this);
    this.restartGame      = this.restartGame.bind(this);

    this.targetNums = ["20", "19", "18", "17", "16", "15", "B"];
    this.playerCounter = 0;
    this.state = {
      players: [
        {
          id: 1,
          name: "Roey",
          score: 0,
          targets: this.getCleanTargets(),
        },
        {
          id: 2,
          name: "Alizah",
          score: 0,
          targets: this.getCleanTargets(),
        },
        {
          id: 3,
          name: "Herzel",
          score: 0,
          targets: this.getCleanTargets(),
        },
        {
          id: 4,
          name: "Davis",
          score: 0,
          targets: this.getCleanTargets(),
        },
      ],
      winner: null,
      leader: null,
      status: "new",
    };
  }

  getCleanTargets() {
    return this.targetNums.map(t => ({ number: t, hits: 0 }));
  }

  addHit(playerId, targetNum) {
    this.updateScore(playerId, targetNum, +1);
  }

  updateScore(playerId, targetNum, hit) {
    // check if game is on
    if (this.state.status !== "running") {
      console.log("Cannot add hit. game is not running");
      return;
    }

    // find indexes for updating players state. this is done becaue of setState mechanizem
    const playerIdx  = this.state.players.findIndex(p => p.id === playerId);
    const targetIdx  = this.state.players[playerIdx].targets.findIndex(t => t.number === targetNum);
    const targetHits = this.state.players[playerIdx].targets[targetIdx].hits;

    // on add, exit if target is closed
    // TODO: disable button when target is closed
    if (hit > 0 && targetHits >= 3) {
      console.log("Target is closed");
      return;
    }
    // on remove, exit if target is empty
    // TODO: disable button when target is empty
    if (hit < 0 && targetHits === 0) {
      console.log("Target is empty");
      return;
    }
    // Update taget hit count and score
    this.setState((prevState) => {
      // copy previous state
      const newState = {};
      const players = prevState.players.slice();

      // update player's target and score
      players[playerIdx].targets[targetIdx].hits += hit;
      players[playerIdx].score += hit;

      // do we have a winner?
      if (players[playerIdx].score === 21) {
        newState.status = "over";
        newState.winner = players[playerIdx].name;
      }
      // return new state
      newState.players = players;
      return newState;
    });
  }

  startGame() {
    if (this.state.status !== "new") {
      throw new Error("Cannot start game, game is not new");
    }
    if (this.state.players.length === 0) {
      throw new Error("Cannot start game, please add players");
    }
    this.setState({ status: "running" });
  }

  restartGame() {
    const cleanPlayer = {
      score: 0,
      targets: this.getClearnTargets(),
    };

    this.setState((prevState) => {
      const newState = {};
      newState.players = prevState.players.map(player => Object.assign(player, cleanPlayer));
      newState.status = "new";
      return newState;
    });
  }

  render() {
    const isNew = (this.state.status === "new");
    return (
      <div id="game">
        <div id="header">
          <h1>Jiminy Cricket</h1>
          <div>
            {
              isNew ? (
                <button type="button" onClick={this.startGame}>Start</button>
              ) : (
                <button type="button" onClick={this.restartGame}>Restart</button>
              )
            }
          </div>
        </div>
        <div id="main">
          <Scoreboard
            numbers={this.targetNums}
            players={this.state.players}
            onAddHit={this.addHit}
          />
        </div>
        <div id="footer" />
      </div>
    );
  }

}
