import React, { Component } from "react";
import cls from "./App.scss";

class App extends Component {
  state = {
    text: "Hello Kaki!",
  };

  render() {
    return (
      <div>
        <h1 className={cls.title}>{this.state.text}</h1>
      </div>
    );
  }
}

export default App;
