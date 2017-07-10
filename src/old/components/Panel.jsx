import React from "react";
import AddPlayer from "./AddPlayer";

export default function Panel(props) {
  const isNew = (props.status === "new");
  let button = "";
  if (isNew) {
    button = <button type="button" onClick={props.handleStart}>Start</button>;
  } else {
    button = <button type="button" onClick={props.handleRestart}>Restart</button>;
  }
  return (
    <div id="panel">
      { isNew && <AddPlayer handler={props.handleAdd} /> }
      { button }
    </div>
  );
}
