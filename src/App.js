import React, { Component } from "react";
import "./App.css";
import Title from "./components/Title";
import Search from "./components/Search";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Title />
        <Search />
      </div>
    );
  }
}

export default App;
