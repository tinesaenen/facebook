import React, { Component } from "react";
import Feed from "./Feed";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <img
            src="/imagesIcons/logoFacebook.png"
            className="header__logo"
            alt="logo"
            height="20"
          />
          <input className="header__input" />
        </header>
        <main>
          <div className="leftColumn">
            <div className="liveFaceTracking">facialrecognition</div>
            <Feed types={["notification", "miniNotification"]} />
          </div>
          <div className="middleColumn">
            <Feed types={["news", "bigNews", "status"]} />
          </div>
          <div className="rightColumn">
            <Feed types={["ad"]} />
          </div>
        </main>
      </div>
    );
  }
}
