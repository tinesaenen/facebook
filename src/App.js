import React, { Component } from "react";
import logo from "./logo.svg";
import Feed from "./Feed";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <img src={logo} className="header__logo" alt="logo" height="20" />
          <input />
        </header>

        <main>
          <div className="leftColumn">
            <div>facialrecognition</div>
            <Feed types={["notification"]} />
          </div>
          <div className="middleColumn">
            <Feed types={["post", "news"]} />
          </div>
          <div className="rightColumn">
            <Feed types={["ad"]} />
          </div>
        </main>
      </div>
    );
  }
}
