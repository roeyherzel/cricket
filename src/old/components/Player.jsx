import React from "react";
import Target from "./Target";


export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.handleHit = this.handleHit.bind(this);
  }

  handleHit(targetNumber, hit) {
    this.props.handleHit(this.props.id, targetNumber, hit);
  }

  render() {
    const targets = this.props.targets.map(t => (
      <Target
        key={t.number}
        number={t.number}
        hits={t.hits}
        handleHit={this.handleHit}
        gameStatus={this.props.gameStatus}
      />
    ));

    return (
      <div className="row">
        <div className="row-info">
          <div className="name">{this.props.name}</div>
        </div>
        <div className="row-stats">
          <div className="score">{this.props.score}</div>
          <div className="row-targets">{targets}</div>
        </div>
      </div>
    );
  }
}
