import React from "react";

export default function Headers(props) {
  const targets = props.targets.map(t => (<div key={t} className="target">{t}</div>));
  return (
    <div className="row headers">
      <div className="row-stats">
        <div className="score">Score</div>
        <div className="row-targets">{targets}</div>
      </div>
    </div>
  );
}
