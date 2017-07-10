import React from "react";
import Scoreboard from "./scenes/Scoreboard";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.getCleanTargets = this.getCleanTargets.bind(this);
    this.targetNumbers = ["20", "19", "18", "17", "16", "15", "B"];
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
      ],
      winner: null,
      leader: null,
      status: "new",
    };
  }

  getCleanTargets() {
    return this.targetNumbers.map(t => ({ number: t, hits: 0 }));
  }

  render() {
    return (
      <div id="game">
        <div id="header">
          <h1>Jiminy Cricket</h1>
        </div>
        <div id="main">
          <Scoreboard
            numbers={this.targetNumbers}
            players={this.state.players}
          />
        </div>
      </div>
    );
  }

}
