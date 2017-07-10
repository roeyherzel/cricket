import React from "react";
import Player from "./components/Player";
import Panel from "./components/Panel";
import Header from "./components/Header";

const TARGETS = ["20", "19", "18", "17", "16", "15", "B"];

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.getClearnTargets = this.getClearnTargets.bind(this);
    this.whosWinning      = this.whosWinning.bind(this);
    this.startGame        = this.startGame.bind(this);
    this.restartGame      = this.restartGame.bind(this);
    this.handleHit        = this.handleHit.bind(this);
    this.addPlayer        = this.addPlayer.bind(this);
    this.targetNumbers = TARGETS;
    this.playerCounter = 0;
    this.state = {
      players: [],
      winner: null,
      leader: null,
      status: "new",
    };
  }

  getClearnTargets() {
    return this.targetNumbers.map(t => ({ number: t, hits: 0 }));
  }

  whosWinning() {
    let leader = this.state.players[0];
    this.state.players.forEach((p) => {
      if (p.score > leader.score) leader = p;
    });
    return leader;
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

  handleHit(playerId, targetNumber, hit) {
    // find indexes for updating players state. this is done becaue of setState mechanizem
    const playerIdx  = this.state.players.findIndex(p => p.id === playerId);
    const targetIdx  = this.state.players[playerIdx].targets.findIndex(t => t.number === targetNumber);
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

      // we have a winner?
      if (players[playerIdx].score === 21) {
        newState.status = "over";
        newState.winner = players[playerIdx].name;
      }
      // return new state
      newState.players = players;
      newState.leader = this.whosWinning();
      return newState;
    });
  }

  addPlayer(name) {
    this.setState((prevState) => {
      const players = prevState.players.slice();
      // add new player with clean stats
      players.push({
        id: this.playerCounter++,
        name,
        score: 0,
        targets: this.getClearnTargets(),
      });
      // return new players state
      return { players };
    });
  }

  render() {
    const players = this.state.players.map(p => (
      <Player
        id={p.id}
        key={p.id}
        name={p.name}
        score={p.score}
        targets={p.targets}
        handleHit={this.handleHit}
        gameStatus={this.state.status}
      />));

    return (
      <div id="game">
        <div id="board">
          <div id="header">
            <h1>Jiminy Cricket</h1>
          </div>

          <Header targets={this.targetNumbers} />
          {players}
          <Panel
            status={this.state.status}
            leader={this.state.leader}
            handleStart={this.startGame}
            handleRestart={this.restartGame}
            handleAdd={this.addPlayer}
          />
        </div>
      </div>
    );
  }
}
